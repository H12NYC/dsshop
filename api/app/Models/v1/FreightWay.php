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
namespace App\Models\v1;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

/**
 * @property int freight_id
 * @property int first_piece
 * @property int add_piece
 * @property int add_cost
 * @property int first_cost
 * @property array location
 */
class FreightWay extends Model
{
    public static $withoutAppends = true;
    protected $appends = ['location_name'];

    /**
     * Prepare a date for array / JSON serialization.
     *
     * @param \DateTimeInterface $date
     * @return string
     */
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    /**
     * 送货到
     * @return array
     */
    public function getLocationNameAttribute()
    {
        if (!self::$withoutAppends) {
            if (isset($this->attributes['location'])) {
                $provinces =Region::where('lang', App::getLocale())->get();
                $provincesArray = [];
                $location = json_decode($this->attributes['location'], true);
                $locationNamej = [];
                foreach ($provinces as $p) {
                    $provincesArray[$p['id']] = $p['name'];
                }
                foreach ($location as $l) {
                    $locationNamej[] = $provincesArray[$l];
                }
                return $locationNamej;
            }
        }
    }

    /**
     * 送货到
     * @return void
     */
    public function getLocationAttribute()
    {
        if (!self::$withoutAppends) {
            if (isset($this->attributes['location'])) {
                return json_decode($this->attributes['location'], true);
            }
        } else {
            return $this->attributes['location'];
        }

    }

    /**
     * 首费
     * @return float|int
     */
    public function getFirstCostAttribute()
    {
        if (!self::$withoutAppends) {
            if (isset($this->attributes['first_cost'])) {
                return sprintf("%01.2f", $this->attributes['first_cost'] / 100);
            }
        } else {
            return $this->attributes['first_cost'];
        }

    }

    /**
     * 续费
     * @return float|int
     */
    public function getAddCostAttribute()
    {
        if (!self::$withoutAppends) {
            if (isset($this->attributes['add_cost'])) {
                return sprintf("%01.2f", $this->attributes['add_cost'] / 100);
            }
        } else {
            return $this->attributes['add_cost'];
        }

    }

    /**
     * 送货到
     *
     * @param integer $value
     * @return void
     */
    public function setLocationAttribute($value)
    {
        $this->attributes['location'] = json_encode($value);
    }

    /**
     * 首费
     *
     * @param float $value
     * @return void
     */
    public function setFirstCostAttribute($value)
    {
        $this->attributes['first_cost'] = sprintf("%01.2f", $value) * 100;
    }

    /**
     * 续费
     *
     * @param float $value
     * @return void
     */
    public function setAddCostAttribute($value)
    {
        $this->attributes['add_cost'] = sprintf("%01.2f", $value) * 100;
    }
}
