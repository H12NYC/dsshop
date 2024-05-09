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
namespace App\Http\Controllers;

/**
 * @group [CLIENT]Sitemap(sitemap生成)
 * Class SitemapController
 * @package App\Http\Controllers
 */
class SitemapController extends Controller
{
    private $sitemap;

    public function __construct()
    {
        $this->sitemap = config('sitemap');
    }

    /**
     * SitemapList
     * 创建 Sitemap 索引
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = [];
        foreach ($this->sitemap as $s) {
            if ($s['model']) {
                $model = '\\App\\Models\\v'.config('tfshop.versions').'\\' . $s['model'];
                $first = $model::orderBy('updated_at', 'desc')->first();
                if($first){
                    $s['updated_at'] = date("Y-m-d",strtotime($first->updated_at));
                    $data[] = $s;
                }
            } else {
                $s['updated_at'] = date("Y-m-d");
                $data[] = $s;
            }
        }
        return response()->view('sitemap.index', ['data' => $data])->header('Content-Type', 'text/xml');
    }

    /**
     * SitemapDetail
     * 创建 Sitemap URL 文件
     * @param $id
     * @queryParam  id int 索引
     * @return \Illuminate\Http\Response
     */
    public function detail($id)
    {
        $sitemap = $this->sitemap[$id];
        if ($sitemap['model']) {
            $model = '\\App\\Models\\v'.config('tfshop.versions').'\\' . $sitemap['model'];
            $where = [];
            foreach ($sitemap['where'] as $w) {
                $where[] = [$w['column'], $w['operator'], $w['value']];
            }
            $data = $model::where($where)->get();
            foreach ($data as $id => $d) {
                $data[$id]['sitemap_url'] = $sitemap['url'];
                $parameter = '';
                foreach ($sitemap['key'] as $key) {
                    if ($sitemap['connector'] == '&') {
                        $parameter .= $sitemap['connector'] . $key . '=' . $d[$key];
                    }else{
                        $parameter .= $sitemap['connector'] .$d[$key];
                    }
                }
                if ($sitemap['connector'] == '&') {
                    $parameter = preg_replace('/&/', '?', $parameter, 1);
                }
                $data[$id]['sitemap_parameter'] = $parameter;
                $data[$id]['updated_at'] = date("Y-m-d",strtotime($d->updated_at));
            }
        } else {
            $data[] = [
                'sitemap_url' => $sitemap['url'],
                'sitemap_parameter' => '',
                'updated_at' => date("Y-m-d")
            ];
        }
        return response()->view('sitemap.detail', [
            'data' => $data,
        ])->header('Content-Type', 'text/xml');
    }
}
