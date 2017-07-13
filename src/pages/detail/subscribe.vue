<template>
    <div class="sales-board">
        <div class="sales-board-form">
            <div class="sales-board-line">
                <div class="sales-board-line-left">
                    预约时间：
                </div>
                <div class="sales-board-line-right">
                    <v-chooser :selections="periodList" @on-change="onParamChange('period', $event)"></v-chooser>
                </div>
            </div>
            <div class="sales-board-line">
                <div class="sales-board-line-left">
                    进/出 口：
                </div>
                <div class="sales-board-line-right">
                    <v-chooser :selections="versionList" @on-change="onParamChange('versions', $event)"></v-chooser>
                </div>
            </div>
            <div class="sales-board-line">
                <div class="sales-board-line-left">
                    港区：
                </div>
                <div class="sales-board-line-right">
                    <v-chooser :selections="doorAreaList" @on-change="onParamChange('doorarea', $event)"></v-chooser>
                </div>
            </div>
            <div class="sales-board-line">
                <div class="sales-board-line-left">
                    做箱区域：
                </div>
                <picker :slots="slots" @change="onValuesChange" @click-item="onValuesChange"></picker>
                <div class="sales-board-line-right" :class="item.class" v-for="(item,index) in portDistrict">
                    <v-linkage-selection :valueIndex="item.value" :selections="buyTypes" @on-change="onParamChange('buyType', $event)"></v-linkage-selection>
                    <!--<v-linkage-selection :valueIndex="item.value" :selections="buyTypes" @on-change="onParamChange('buyType', $event)"></v-linkage-selection>-->
                    <i @click="item.doFun" v-if="item.doFun && (item.display === '-' || (item.display === '+' && portDistrict.length < 3))">{{item.display}}</i>
                </div>
            </div>
    
            <div class="sales-board-line">
                <div class="sales-board-line-left">
                    预约人：
                </div>
                <div class="sales-board-line-right">
                    阿策
                </div>
            </div>
            <div class="sales-board-line">
                <div class="sales-board-line-left">
                    联系电话：
                </div>
                <div class="sales-board-line-right">
                    15200008888
                </div>
            </div>
            <div class="sales-board-line">
                <div class="sales-board-line-left">
                    备注：
                </div>
                <div class="sales-board-line-right">
                    <textarea></textarea>
                </div>
            </div>
            <div class="sales-board-line">
                <div class="sales-board-line-left">&nbsp;</div>
                <div class="sales-board-line-right">
                    <div class="button" @click="showPayDialog">
                        预约
                    </div>
                </div>
            </div>
        </div>
        <my-dialog :is-show="isShowPayDialog" @on-close="hidePayDialog">
            <table class="buy-dialog-table">
                <tr>
                    <th>购买数量</th>
                    <th>产品类型</th>
                    <th>有效时间</th>
                    <th>产品版本</th>
                    <th>总价</th>
                </tr>
                <tr>
                    <td>{{ buyNum }}</td>
                    <td>{{ buyType.label }}</td>
                    <td>{{ period.label }}</td>
                    <td>
                        <span v-for="item in versions">{{ item.label }}</span>
                    </td>
                    <td>{{ price }}</td>
                </tr>
            </table>
            <h3 class="buy-dialog-title">请选择银行</h3>
            <bank-chooser @on-change="onChangeBanks"></bank-chooser>
            <div class="button buy-dialog-btn" @click="confirmBuy">
                确认购买
            </div>
        </my-dialog>
        <my-dialog :is-show="isShowErrDialog" @on-close="hideErrDialog">
            支付失败！
        </my-dialog>
        <check-order :is-show-check-dialog="isShowCheckOrder" :order-id="orderId" @on-close-check-dialog="hideCheckOrder"></check-order>
    </div>
</template>

<script>
import VLinkageSelection from '../../components/base/linkageSelection'
import VChooser from '../../components/base/chooser'
import VMulChooser from '../../components/base/multiplyChooser'
import Dialog from '../../components/base/dialog'
import BankChooser from '../../components/bankChooser'
import CheckOrder from '../../components/checkOrder'
import Picker from '../../components/base/picker'
import _ from 'lodash'
export default {
    components: {
        VLinkageSelection,
        VChooser,
        VMulChooser,
        MyDialog: Dialog,
        BankChooser,
        CheckOrder,
        Picker
    },
    data() {
        return {
            buyNum: 0,
            buyType: {},
            versions: [],
            period: {},
            price: 0,
            slots: [{
                flex: 1,
                values: ['上海', '江苏', '浙江', '安徽'],
                className: 'slot1',
                textAlign: 'right'
            }, {
                divider: true,
                content: '-',
                className: 'slot2'
            }, {
                flex: 1,
                values: [],
                className: 'slot3',
                textAlign: 'left'
            }],
            portDistrict: [{
                province: '上海',
                city: '上海市',
                doFun: this.addPortDistrict,
                display: '+',
                value: 1
            }],
            versionList: [{
                label: '进口',
                value: 'IB'
            }, {
                label: '出口',
                value: 'OB'
            }],
            doorAreaList: [{
                label: '外高桥',
                value: 'IB'
            }, {
                label: '洋山',
                value: 'OB'
            }],
            periodList: [{
                label: '明天',
                value: 0
            }, {
                label: '后天',
                value: 1
            }, {
                label: '大后天',
                value: 2
            }],
            buyTypes: [{
                'name': '上海',
                'sub': ['请选择', '黄浦区', '卢湾区', '徐汇区', '长宁区', '静安区', '普陀区', '闸北区', '虹口区', '杨浦区', '宝山区', '闵行区', '嘉定区', '松江区', '金山区', '青浦区', '南汇区', '奉贤区', '浦东新区', '崇明县', '其他']
            }, {
                'name': '江苏',
                'sub': ['请选择', '南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁', '其他']
            }, {
                'name': '安徽',
                'sub': ['请选择', '合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城', '其他']
            }, {
                'name': '浙江',
                'sub': ['请选择', '杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水', '其他']
            }],
            isShowPayDialog: false,
            bankId: null,
            orderId: null,
            isShowCheckOrder: false,
            isShowErrDialog: false
        }
    },
    methods: {
        onValuesChange(picker, values) {
            let index = this.$data.slots[0].values.indexOf(values)
            index = index > -1 ? index : 0
            this.$set(this.$data.slots[2], 'values', this.buyTypes[index].sub)
        },
        onParamChange(attr, val) {
            this[attr] = val
            this.getPrice()
        },
        reducePortDistrict() {
            this.portDistrict = this.portDistrict.splice(0, this.portDistrict.length - 1)
        },
        addPortDistrict() {
            this.portDistrict.push({
                province: '上海',
                city: '上海市',
                class: 'board-line-offset',
                doFun: this.reducePortDistrict,
                display: '-',
                value: 0
            })
        },
        getPrice() {
            let buyVersionsArray = _.map(this.versions, (item) => {
                return item.value
            })
            let reqParams = {
                buyNumber: this.buyNum,
                buyType: this.buyType.value,
                period: this.period.value,
                version: buyVersionsArray.join(',')
            }
            this.$http.post('/api/getPrice', reqParams).then((res) => {
                this.price = res.data.amount
            })
        },
        showPayDialog() {
            this.isShowPayDialog = true
        },
        hidePayDialog() {
            this.isShowPayDialog = false
        },
        hideErrDialog() {
            this.isShowErrDialog = false
        },
        hideCheckOrder() {
            this.isShowCheckOrder = false
        },
        onChangeBanks(bankObj) {
            this.bankId = bankObj.id
        },
        confirmBuy() {
            let buyVersionsArray = _.map(this.versions, (item) => {
                return item.value
            })
            let reqParams = {
                buyNumber: this.buyNum,
                buyType: this.buyType.value,
                period: this.period.value,
                version: buyVersionsArray.join(','),
                bankId: this.bankId
            }
            this.$http.post('/api/createOrder', reqParams)
                .then((res) => {
                    this.orderId = res.data.orderId
                    this.isShowCheckOrder = true
                    this.isShowPayDialog = false
                }, (err) => {
                    console.log(err)
                    this.isShowBuyDialog = false
                    this.isShowErrDialog = true
                })
        }
    },
    mounted() {
        this.buyNum = 1
        this.buyType = this.buyTypes[0]
        this.versions = [this.versionList[0]]
        this.period = this.periodList[0]
        this.getPrice()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
    background: red !important;
}
.buy-dialog-title {
    font-size: 16px;
    font-weight: bold;
}

.buy-dialog-btn {
    margin-top: 20px;
}

.buy-dialog-table {
    width: 100%;
    margin-bottom: 20px;
}

.buy-dialog-table td,
.buy-dialog-table th {
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 5px 0;
}

.buy-dialog-table th {
    background: #4fc08d;
    color: #fff;
    border: 1px solid #4fc08d;
}

.board-line-offset.sales-board-line-right {
    margin-left: 104px;
    margin-top: 5px;
}

.sales-board-line-left {
    color: red;
}
</style>
