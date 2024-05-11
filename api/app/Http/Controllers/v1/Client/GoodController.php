<?php
/** +----------------------------------------------------------------------
 * | TFSHOP [ 轻量级易扩展低代码开源商城系统 ]
 * +----------------------------------------------------------------------
 * | Copyright (c) 2020~2023 https://www.dswjcms.com All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed 未经许可不能去掉TFSHOP相关版权
 * +----------------------------------------------------------------------
 * | Author: Purl <383354826@qq.com>
 * +----------------------------------------------------------------------
 */
namespace App\Http\Controllers\v1\Client;

use App\Models\v1\GoodSku;
use App\Models\v1\Category;
use App\Models\v1\Good;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\App;

/**
 * @group [CLIENT]Goods(商品)
 * Class GoodController
 * @package App\Http\Controllers\v1\Client
 */
class GoodController extends Controller
{
    /**
     * GoodList
     * 商品列表
     * @param Request $request
     * @return \Illuminate\Http\Response
     * @queryParam  limit int 每页显示条数
     * @queryParam  sort string 排序
     * @queryParam  page string 页码
     * @queryParam  pid int 类目ID
     * @queryParam  ids array 商品ID组
     */
    public function list(Request $request)
    {
        Good::$withoutAppends = false;
        GoodSku::$withoutAppends = false;
        $q = Good::query();
        $limit = $request->limit;
        //是否推荐
        if ($request->has('is_recommend')) {
            $q->where('is_recommend', $request->is_recommend);
        }
        $q->where('is_show', Good::GOOD_SHOW_PUTAWAY);
        if ($request->title) {
            $q->where(function ($q1) use ($request) {
                $q1->orWhere('name', 'like', '%' . $request->title . '%');
            });
        }
        //排序
        if ($request->has('sort')) {
            if ($request->sort) {
                $sortFormatConversion = sortFormatConversion($request->sort);
                $q->orderBy($sortFormatConversion[0], $sortFormatConversion[1]);
            } else {
                $q->orderBy('is_recommend', 'DESC')
                    ->orderBy('is_hot', 'DESC')
                    ->orderBy('is_new', 'DESC')
                    ->orderBy('sort', 'ASC')
                    ->orderBy('time', 'DESC');
            }
        } else {
            //默认排序
            $q->orderBy('is_recommend', 'DESC')
                ->orderBy('is_hot', 'DESC')
                ->orderBy('is_new', 'DESC')
                ->orderBy('sort', 'ASC')
                ->orderBy('time', 'DESC');
        }
        // 如果有设置商品ID组的话，如果无值的话，不展示数据
        if ($request->has('ids')) {
            if ($request->ids) {
                $q->whereIn('id', explode(',', $request->ids));
            } else {
                $q->where('id', 0);
            }
        }
        // 自定义类目
        if ($request->has('pid')) {
            $q->whereHas('category', function ($query) use ($request) {
                $query->where('category_id', $request->pid);
            });
        }
        // 获取指定分类下的商品
        if ($request->has('category_id')) {
            $Category = Category::where('state', Category::CATEGORY_STATE_YES)->select('id', 'pid')->get();
            $allSublevel = allSublevel($Category->toArray(), [$request->category_id]);
            if (count($allSublevel) > 0) {
                $q->whereIn('category_id', $allSublevel);
            }
        }
        $q->where('lang', App::getLocale());
        $paginate = $q->with(['resources' => function ($q) {
            $q->where('depict', 'like', '%_zimg');
        }, 'goodSku' => function ($q) {
            $q->select('good_id', 'price', 'inventory', 'market_price');
        }])->select('updated_at', 'id', 'name', 'number', 'market_price', 'sales', 'order_price', 'brand_id', 'price', 'is_show', 'is_recommend', 'is_new', 'is_hot', 'sort', 'time')->paginate($limit);
        if ($paginate) {
            foreach ($paginate as $id => $p) {
                $paginate[$id]['price_show'] = (new Good())->getPriceShow($p);
                $paginate[$id]['original_price_show'] = (new Good())->getMarketPriceShow($p);
                $paginate[$id]['inventory_show'] = (new Good())->getInventoryShow($p);
            }
        }
        return resReturn(1, $paginate);
    }

    /**
     * GoodDetail
     * 商品详情
     * @param int $id
     * @return \Illuminate\Http\Response
     * @queryParam  id int 商品ID
     */
    public function detail($id)
    {
        Good::$withoutAppends = false;
        GoodSku::$withoutAppends = false;
        $Good = Good::with(['resourcesMany', 'resources', 'goodSku' => function ($q) {
            $q->with(['resources' => function ($q) {
                $q->where('depict', '!=', 'product_sku_file');
            }])->where('inventory', '>', 0);
        }])->find($id);
        $Good['price_show'] = (new Good())->getPriceShow($Good);
        $Good['market_price_show'] = (new Good())->getMarketPriceShow($Good);
        $Good['inventory_show'] = (new Good())->getInventoryShow($Good);
        return resReturn(1, $Good);
    }

    /**
     * GoodCategory
     * 商品分类
     * @param Request $request
     * @return \Illuminate\Http\Response
     * @queryParam  tree boolean 返回格式是否为树状结构
     * @queryParam  is_recommend int 是否首页展示
     * @queryParam  limit int 每页显示条数
     * @queryParam  sort string 排序
     * @queryParam  page string 页码
     */
    public function category(Request $request)
    {
        $q = Category::query();
        $q->where('state', Category::CATEGORY_STATE_YES);
        if ($request->has('is_recommend')) {
            $q->where('is_recommend', $request->is_recommend);
            $q->with(['Category' => function ($q) {
                $q->select('id', 'pid');
            }]);
        }
        if ($request->has('sort')) {
            $sortFormatConversion = sortFormatConversion($request->sort);
            $q->orderBy($sortFormatConversion[0], $sortFormatConversion[1]);
        } else {
            $q->orderBy('sort', 'ASC')->orderBy('id', 'ASC');
        }
        $q->where('lang', App::getLocale());
        $paginate = $q->with(['resources'])->get();
        if ($request->has('tree')) {
            $paginate = genTree($paginate->toArray(), 'pid');
        }
        return resReturn(1, $paginate);
    }
}
