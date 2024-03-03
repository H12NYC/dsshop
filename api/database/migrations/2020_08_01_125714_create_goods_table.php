<?php
/** +----------------------------------------------------------------------
 * | DSSHOP [ 轻量级易扩展低代码开源商城系统 ]
 * +----------------------------------------------------------------------
 * | Copyright (c) 2020~2023 https://www.dswjcms.com All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed 未经许可不能去掉DSSHOP相关版权
 * +----------------------------------------------------------------------
 * | Author: Purl <383354826@qq.com>
 * +----------------------------------------------------------------------
 */
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateGoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('goods', function (Blueprint $table) {
            $table->id();
            $table->string('identification',30)->comment('标识');
            $table->string('lang', 60)->default('zh')->comment('语言');
            $table->unsignedBigInteger('lang_parent_id')->default('0')->comment('翻译原始数据ID');
            $table->unsignedTinyInteger('type')->default(0)->comment('类型:0=普通商品-common,1=虚拟商品-virtual,2=卡密/网盘-keys,3=下载商品-download');
            $table->string('name',60)->comment('商品名称');
            $table->bigInteger('category_id')->default(0)->index()->comment('分类ID');
            $table->string('number',50)->comment('货号');
            $table->unsignedTinyInteger('freight_type')->default(0)->comment('运费方式:0=固定邮费-fixed,1=运费模板-template');
            $table->bigInteger('freight_id')->default(0)->index()->comment('运费模板ID');
            $table->integer('freight')->default(0)->comment('运费');
            $table->bigInteger('brand_id')->default(0)->index()->comment('品牌ID');
            $table->integer('inventory')->default(0)->comment('库存');
            $table->integer('market_price')->default(0)->comment('市场价');
            $table->integer('cost_price')->default(0)->comment('成本价');
            $table->integer('price')->default(0)->comment('销售价');
            $table->integer('sales')->default(0)->comment('销量');
            $table->integer('order_price')->default(0)->comment('订单价');
            $table->string('keywords',255)->nullable()->comment('关键字');
            $table->string('short_description',160)->nullable()->comment('短描述');
            $table->text('details')->nullable()->comment('详情');
            $table->tinyInteger('is_show')->default(0)->comment('是否上架0暂不售卖，放入仓库1立即上架售卖2定时上架');
            $table->tinyInteger('is_recommend')->default(0)->comment('是否推荐0否1是');
            $table->tinyInteger('is_new')->default(0)->comment('是否新品0否1是');
            $table->tinyInteger('is_hot')->default(0)->comment('是否热销0否1是');
            $table->tinyInteger('is_inventory')->default(0)->comment('减库存方式：0拍下减库存1付款减库存');
            $table->softDeletes();
            $table->integer('sort')->default(0)->comment('排序');
            $table->timestamp('time')->nullable()->comment('上架时间');
            $table->timestamp('timing')->nullable()->comment('定时上架时间');
            $table->timestamps();
            $table->unique('id');
        });
        DB::statement("ALTER TABLE `goods` COMMENT='商品'");
        DB::statement('ALTER TABLE goods ADD fulltext index full_text(name,keywords,number) with parser ngram');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('goods');
    }
}
