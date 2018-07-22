<template>
    <el-container class="au-container">
        <el-header class="au-header bottom-line">
            <el-row>
                <el-col :span="4">
                    <el-button size="mini" type="primary" plain>卸货</el-button>
                    <el-button size="mini" type="primary" plain>二次发车</el-button>
                </el-col>
                <el-col :span="20">
                    <el-select v-model="printOption" size="mini" style="width: 100px" placeholder="打印">
                        <el-option label="装车清单" value="0"></el-option>
                        <el-option label="发车清单" value="1"></el-option>
                        <el-option label="随车清单" value="2"></el-option>
                    </el-select>
                    <el-button size="mini" type="primary" plain class="ml-10">上传附件</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main class="au-main flex-1 flex-cloumn pd-10">
            <!-- tab按钮 -->
            <el-row class="bottom-line mt-10">
                <el-col :span="4">
                    <el-button size="medium" @click="handleChangeTab('1')">派车</el-button>
                    <el-button size="medium" @click="handleChangeTab('2')">添加订单</el-button>
                </el-col>
                <el-col :span="20">
                    <el-form v-if="currentTab==='2'" v-model="fast" :inline="true" size="small" class="au-fast-form">
                        <el-form-item label="快速添加：">
                            <el-input v-model="fast.add"></el-input>
                        </el-form-item>
                        <el-button size="small" icon="el-icon-arrow-right"></el-button>
                        <el-button size="small" icon="el-icon-d-arrow-right"></el-button>
                        <el-button size="small" icon="el-icon-d-arrow-left"></el-button>
                        <el-button size="small" icon="el-icon-arrow-left"></el-button>
                        <el-form-item label="快速删除：" class="ml-10">
                            <el-input v-model="fast.del"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row v-if="currentTab==='1'" class="flex-1">
                <el-form v-model="form" :inline="true" label-position="left" label-width="96px" size="small" class="au-form-wrapper">
                    <el-row>
                        <el-form-item label="合同编号：">
                            <el-input v-model="form.name" disabled class="au-form-control"></el-input>
                        </el-form-item>
                        <el-form-item label="发车日期：">
                            <el-date-picker v-model="form.date1" class="au-form-control" type="date" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="派车状态：">
                            <el-select v-model="form.region" class="au-form-control" placeholder="请选择派车状态">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="制单人：">
                            <el-input v-model="form.name" class="au-form-control"></el-input>
                        </el-form-item>
                        <el-form-item label="发货网点：">
                            <el-input v-model="form.name" class="au-form-control"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row class="au-block-title">
                        调度信息：
                    </el-row>
                    <el-row>
                        <el-form-item label="委托类型：">
                            <el-select v-model="form.region"  class="au-form-control" placeholder="请选择委托类型">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="承运商：">
                            <el-input v-model="form.name"  class="au-form-control"></el-input>
                        </el-form-item>
                        <el-form-item label="车牌号：">
                            <el-input v-model="form.name"  class="au-form-control"></el-input>
                        </el-form-item>
                        <el-form-item label="驾驶员：">
                            <el-input v-model="form.name"  class="au-form-control"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话：">
                            <el-input v-model="form.name"  class="au-form-control"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row :inline="true">
                        <el-form-item label="备注：">
                            <el-input v-model="form.name" class="au-form-control" style="width: 649px"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row class="au-block-title">
                        本单费用：
                    </el-row>
                    <el-row :inline="true">
                        <el-form-item label="现付驾驶员：">
                            <el-input v-model="form.name" class="au-form-control"></el-input>
                        </el-form-item>
                        <el-form-item label="到付驾驶员：">
                            <el-input v-model="form.name" class="au-form-control"></el-input>
                        </el-form-item>
                        <el-form-item label="回付驾驶员：">
                            <el-input v-model="form.name" class="au-form-control"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row :inline="true">
                        <el-form-item label="油卡卡号：">
                            <el-input v-model="form.name" class="au-form-control"></el-input>
                        </el-form-item>
                        <el-form-item label="油卡公司：">
                            <el-input v-model="form.name" class="au-form-control"></el-input>
                        </el-form-item>
                        <el-form-item label="油卡驾驶员：">
                            <el-input v-model="form.name" class="au-form-control"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row :inline="true">
                        <el-form-item label="封布费：">
                            <el-input v-model="form.name" class="au-form-control"></el-input>
                        </el-form-item>
                        <el-form-item label="保险费：">
                            <el-input v-model="form.name" class="au-form-control"></el-input>
                        </el-form-item>
                        <el-form-item label="装卸费：">
                            <el-input v-model="form.name" class="au-form-control"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row :inline="true">
                        <el-form-item label="落地费：">
                            <el-input v-model="form.name" class="au-form-control"></el-input>
                        </el-form-item>
                        <el-form-item label="其他费用：">
                            <el-input v-model="form.name" class="au-form-control"></el-input>
                        </el-form-item>
                        <el-form-item class="w-116" label="其他费用说明：">
                            <el-input v-model="form.name" style="width: 126px;" class="au-form-control"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row :inline="true">
                        <el-form-item label="费用合计：">
                            <el-input v-model="form.name" class="au-form-control" style="width: 649px"></el-input>
                        </el-form-item>
                    </el-row>
                </el-form>
            </el-row>
            <el-row v-if="currentTab==='2'" :gutter="10" class="flex-1">
                <el-col :span="12" class="overflow-x-auto h-100">
                    <el-table
                        ref="multipleTable"
                        :data="tableData1"
                        size="small"
                        tooltip-effect="dark"
                        border
                        show-summary
                        height="100%">
                        <el-table-column
                            type="selection"
                            width="60">
                        </el-table-column>
                        <el-table-column
                            label="序号"
                            prop="index"
                            width="60">
                            <template slot-scope="scope">
                                <el-input v-if="scope.$index === 0 && openLeftColumnSearch" v-model="leftColumnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleLeftColumnSearch"></el-input>
                                <span v-else>{{ scope.row[scope.column.property] }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            v-for="item in leftTableColumns"
                            v-if="leftChoosenColumns.indexOf(item.label) > -1"
                            :key="item.prop"
                            :prop="item.prop"
                            :label="item.label"
                            :width="item.width"
                            :min-width="item['min-width'] || 100">
                            <template slot-scope="scope">
                                <el-input v-if="scope.$index === 0 && openLeftColumnSearch" v-model="leftColumnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleLeftColumnSearch"></el-input>
                                <span v-else>{{ scope.row[scope.column.property] }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="12" class="flex-cloumn h-100">
                    <el-row class="posi-rela" style="height: 200px; margin-bottom: 10px">
                        <el-button type="primary" size="small" class="au-add-site-btn" @click="handleAddSite">新增到货网点</el-button>
                        <el-table
                            ref="multipleTable"
                            :data="tableData2"
                            size="small"
                            tooltip-effect="dark"
                            border
                            height="100%">
                            <el-table-column
                                type="selection"
                                width="60">
                            </el-table-column>
                            <el-table-column
                                label="序号"
                                prop="index"
                                width="60">
                            </el-table-column>
                            <el-table-column
                                label="卸货网点"
                                prop="site"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                label="单数"
                                prop="num"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                width="100">
                                <template slot-scope="scope">
                                    <a class="au-del-site-btn" href="javascript:;" @click="handleDelete(scope.$index, scope.row)">删除</a>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row class="overflow-x-auto flex-1">
                        <el-table
                            ref="multipleTable"
                            :data="tableData3"
                            size="small"
                            tooltip-effect="dark"
                            border
                            height="100%">
                            <el-table-column
                                type="selection"
                                width="60">
                            </el-table-column>
                            <el-table-column
                                label="序号"
                                prop="index"
                                width="60">
                                <template slot-scope="scope">
                                    <el-input v-if="scope.$index === 0 && openRightColumnSearch" v-model="rightColumnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleRightColumnSearch"></el-input>
                                    <span v-else>{{ scope.row[scope.column.property] }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                v-for="item in rightTableColumns"
                                v-if="rightChoosenColumns.indexOf(item.label) > -1"
                                :key="item.prop"
                                :prop="item.prop"
                                :label="item.label"
                                :width="item.width"
                                :min-width="item['min-width'] || 100">
                                <template slot-scope="scope">
                                    <el-input v-if="scope.$index === 0 && openRightColumnSearch" v-model="rightColumnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleRightColumnSearch"></el-input>
                                    <span v-else>{{ scope.row[scope.column.property] }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-col>
            </el-row>
        </el-main>
        <el-footer v-if="currentTab==='2'" class="au-footer">
            <el-row>
                <el-col :span="12">
                    <el-button size="mini" type="info" @click="leftTableDialog=true">列选择</el-button>
                    <el-button type="info" size="mini" @click="toggleLeftColumnSearch">列搜索</el-button>
                    <el-button type="info" size="mini">导出</el-button>
                </el-col>
                <el-col :span="12">
                    <el-button size="mini" type="info" @click="rightTableDialog=true" >列选择</el-button>
                    <el-button type="info" size="mini" @click="toggleRightColumnSearch">列搜索</el-button>
                    <el-button type="info" size="mini">导出</el-button>
                </el-col>
            </el-row>
        </el-footer>
        <el-dialog :visible.sync="dialogTableVisible">
            <el-table
                ref="multipleTable"
                :data="tableData1"
                :summary-method="handleSummary"
                show-summary
                size="small"
                tooltip-effect="dark"
                border
                height="300">
                <el-table-column
                    type="selection"
                    width="60">
                </el-table-column>
                <el-table-column
                    label="序号"
                    prop="index"
                    width="60">
                </el-table-column>
                <el-table-column
                    label="托运商单号"
                    prop="id"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    label="开单日期"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    label="发站"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    label="到站"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    label="发货网点"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    label="目的网点"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    label="品名"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    label="件数"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    label="重量（公斤）"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    label="体积（立方）"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    label="储位"
                    min-width="100">
                </el-table-column>
            </el-table>
            <div slot="footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="leftTableDialog" title="列选择">
            <el-checkbox-group v-model="leftChoosenColumns" class="au-checkbox-group flex-cloumn">
                <el-checkbox v-for="column in leftTableColumns" :label="column.label" :key="column.label">{{column.label}}</el-checkbox>
            </el-checkbox-group>
        </el-dialog>
        <el-dialog :visible.sync="rightTableDialog" title="列选择">
            <el-checkbox-group v-model="rightChoosenColumns" class="au-checkbox-group flex-cloumn">
                <el-checkbox v-for="column in rightTableColumns" :label="column.label" :key="column.label">{{column.label}}</el-checkbox>
            </el-checkbox-group>
        </el-dialog>
    </el-container>
</template>

<script>
const leftColumns = [
    {    
        label: "运单号",
        prop: 'prop1'
    },
    {    
        label: "到站",
        prop: 'prop2'
    },
    {    
        label: "目的网点",
        prop: 'prop3'
    },
    {    
        label: "发货单位",
        prop: 'prop4'
    },
    {    
        label: "品名",
        prop: 'prop5'
    },
    {    
        label: "件数",
        prop: 'prop6'
    },
    {    
        label: "重量（公斤）",
        prop: 'prop7'
    },
    {    
        label: "体积（立方）",
        prop: 'prop8'
    },
    {    
        label: "应收合计",
        prop: 'prop9'
    },
    {    
        label: "托运商单号",
        prop: 'prop10'
    },
    {    
        label: "开单日期",
        prop: 'prop11'
    },
    {    
        label: "运单状态",
        prop: 'prop12'
    },
    {    
        label: "发站",
        prop: 'prop13'
    },
    {    
        label: "发货网点",
        prop: 'prop14'
    },
    {    
        label: "运输方式",
        prop: 'prop15'
    },
    {    
        label: "发货人",
        prop: 'prop16'
    },
    {    
        label: "发货人电话",
        prop: 'prop17'
    },
    {    
        label: "发货地址",
        prop: 'prop18'
    },
    {    
        label: "交接方式",
        prop: 'prop19'
    },
    {    
        label: "收货单位",
        prop: 'prop20'
    },
    {    
        label: "收货人",
        prop: 'prop21'
    },
    {    
        label: "收货人电话",
        prop: 'prop22'
    },
    {    
        label: "收货地址",
        prop: 'prop23'
    },
    {    
        label: "提货费",
        prop: 'prop24'
    },
    {    
        label: "运费",
        prop: 'prop25'
    },
    {    
        label: "送货费",
        prop: 'prop26'
    },
    {    
        label: "装卸费",
        prop: 'prop27'
    },
    {    
        label: "声明价值",
        prop: 'prop28'
    },
    {    
        label: "保价费",
        prop: 'prop29'
    },
    {    
        label: "包装费",
        prop: 'prop30'
    },
    {    
        label: "仓储费",
        prop: 'prop31'
    },
    {    
        label: "其他费用",
        prop: 'prop32'
    },
    {    
        label: "预付进仓费",
        prop: 'prop33'
    },
    {    
        label: "实付进仓费",
        prop: 'prop34'
    },
    {    
        label: "结算状态",
        prop: 'prop35'
    },
    {    
        label: "回扣状态",
        prop: 'prop36'
    },
    {    
        label: "回扣",
        prop: 'prop37'
    },
    {    
        label: "应结算金额（应收合计-回扣）",
        prop: 'prop38',
        "min-width": 200
    },
    {    
        label: "付款方式",
        prop: 'prop39'
    },
    {    
        label: "现付状态",
        prop: 'prop40'
    },
    {    
        label: "现付",
        prop: 'prop41'
    },
    {    
        label: "到付状态",
        prop: 'prop42'
    },
    {    
        label: "到付",
        prop: 'prop43'
    },
    {    
        label: "发货月结状态",
        prop: 'prop44'
    },
    {    
        label: "发货月结",
        prop: 'prop45'
    },
    {    
        label: "收货月结状态",
        prop: 'prop46'
    },
    {    
        label: "收货月结",
        prop: 'prop47'
    },
    {    
        label: "欠付状态",
        prop: 'prop48'
    },
    {    
        label: "欠付",
        prop: 'prop49'
    },
    {    
        label: "回单付状态",
        prop: 'prop50'
    },
    {    
        label: "回单付",
        prop: 'prop51'
    },
    {    
        label: "货到打卡状态",
        prop: 'prop52'
    },
    {    
        label: "货到打卡",
        prop: 'prop53'
    },
    {    
        label: "贷款扣状态",
        prop: 'prop54'
    },
    {    
        label: "贷款扣",
        prop: 'prop55'
    },
    {    
        label: "制单人",
        prop: 'prop56'
    },
    {    
        label: "回单份数",
        prop: 'prop57'
    },
    {    
        label:  "备注",
        prop: 'prop58'
    }
]
const rightColumns = [
    {    
        label: "运单号",
        prop: 'prop1'
    },
    {    
        label: "托运商单号",
        prop: 'prop2'
    },
    {    
        label: "开单日期",
        prop: 'prop3'
    },
    {    
        label: "运单状态",
        prop: 'prop4'
    },
    {    
        label: "发站",
        prop: 'prop5'
    },
    {    
        label: "到站",
        prop: 'prop6'
    },
    {    
        label: "发货网点",
        prop: 'prop7'
    },
    {    
        label: "目的网点",
        prop: 'prop8'
    },
    {    
        label: "运输方式",
        prop: 'prop9'
    },
    {    
        label: "发货单位",
        prop: 'prop10'
    },
    {    
        label: "发货人",
        prop: 'prop11'
    },
    {    
        label: "发货人电话",
        prop: 'prop12'
    },
    {    
        label: "发货地址",
        prop: 'prop13'
    },
    {    
        label: "交接方式",
        prop: 'prop14'
    },
    {    
        label: "收货单位",
        prop: 'prop15'
    },
    {    
        label: "收货人",
        prop: 'prop16'
    },
    {    
        label: "收货人电话",
        prop: 'prop17'
    },
    {    
        label: "收货地址",
        prop: 'prop18'
    },
    {    
        label: "品名",
        prop: 'prop19'
    },
    {    
        label: "件数",
        prop: 'prop20'
    },
    {    
        label: "重量（公斤）",
        prop: 'prop21'
    },
    {    
        label: "体积（立方）",
        prop: 'prop22'
    },
    {    
        label: "提货费",
        prop: 'prop23'
    },
    {    
        label: "运费",
        prop: 'prop24'
    },
    {    
        label: "送货费",
        prop: 'prop25'
    },
    {    
        label: "装卸费",
        prop: 'prop26'
    },
    {    
        label: "声明价值",
        prop: 'prop27'
    },
    {    
        label: "保价费",
        prop: 'prop28'
    },
    {    
        label: "包装费",
        prop: 'prop29'
    },
    {    
        label: "仓储费",
        prop: 'prop30'
    },
    {    
        label: "其他费用",
        prop: 'prop31'
    },
    {    
        label: "预付进仓费",
        prop: 'prop32'
    },
    {    
        label: "实付进仓费",
        prop: 'prop33'
    },
    {    
        label: "结算状态",
        prop: 'prop34'
    },
    {    
        label: "回扣状态",
        prop: 'prop35'
    },
    {    
        label: "回扣",
        prop: 'prop36'
    },
    {    
        label: "应结算金额（应收合计-回扣）",
        prop: 'prop37',
        "min-width": 200
    },
    {    
        label: "付款方式",
        prop: 'prop38'
    },
    {    
        label: "现付状态",
        prop: 'prop39'
    },
    {    
        label: "现付",
        prop: 'prop40'
    },
    {    
        label: "到付状态",
        prop: 'prop41'
    },
    {    
        label: "到付",
        prop: 'prop42'
    },
    {    
        label: "发货月结状态",
        prop: 'prop43'
    },
    {    
        label: "发货月结",
        prop: 'prop44'
    },
    {    
        label: "收货月结状态",
        prop: 'prop45'
    },
    {    
        label: "收货月结",
        prop: 'prop46'
    },
    {    
        label: "欠付状态",
        prop: 'prop47'
    },
    {    
        label: "欠付",
        prop: 'prop48'
    },
    {    
        label: "回单付状态",
        prop: 'prop49'
    },
    {    
        label: "回单付",
        prop: 'prop50'
    },
    {    
        label: "货到打卡状态",
        prop: 'prop51'
    },
    {    
        label: "货到打卡",
        prop: 'prop52'
    },
    {    
        label: "贷款扣状态",
        prop: 'prop53'
    },
    {    
        label: "贷款扣",
        prop: 'prop54'
    },
    {    
        label: "制单人",
        prop: 'prop55'
    },
    {    
        label: "回单份数",
        prop: 'prop56'
    },
    {    
        label: "备注",
        prop: 'prop57'
    }
]
export default {
    data () {
        return {
            currentTab: '1',
            printOption: '',
            fast: {
                add: '',
                del: ''
            },
            form: {

            },
            // 左侧列表
            tableData1: [
                {
                    index: 1,
                    prop1: 18040001
                }
            ],
            // 网点列表
            tableData2: [
                {
                    index: 1,
                    site: '温州网点',
                    num: 20
                },{
                    index: 1,
                    site: '温州网点',
                    num: 20
                }
            ],
            // 左侧列表
            tableData3: [
                {
                    index: 1,
                    prop1: 18040001
                }
            ],
            dialogTableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
            ],
            // dialog开关
            dialogTableVisible: true,
            leftTableDialog: false,
            rightTableDialog: false,
            // 列表表头数据
            leftTableColumns: leftColumns,
            rightTableColumns: rightColumns,
            // 列选择checkbox数据
            leftChoosenColumns: [...leftColumns.map(item => item.label)],
            rightChoosenColumns: [...rightColumns.map(item => item.label)],
            // 列查询相关
            openLeftColumnSearch: false,
            leftColumnSearch: {},
            openRightColumnSearch: false,
            rightColumnSearch: {}
        }
    },
    methods: {
        // 切换 ‘派车’ he1 ‘添加订单’
        handleChangeTab(tab) {
            this.currentTab = tab
        },
        // 左侧列表下方的总结行的数据需要这个函数给返回
        handleSummary(param) {
            console.log(param)
            const sums = ['汇总', 1, 2, 100, 401, 131]

            return sums
        },
        // 右上角列表删除操作
        handleDelete(index, date) {
            console.log(date)
            this.tableData2.splice(index, 1)
        },
        // 新增订单
        handleAddSite() {
            this.tableData2.push({
                index: 1,
                site: '温州网点',
                num: 20
            })
        },
        toggleLeftColumnSearch() {
            if (this.openLeftColumnSearch) {
                if (this.tableData1[0].isColumnSearch) {
                    this.tableData1.shift();
                }
                this.openLeftColumnSearch = false
                this.leftColumnSearch = {}
            } else {
                this.openLeftColumnSearch = true
                if (!this.tableData1[0].isColumnSearch) {
                    this.tableData1.unshift({
                        isColumnSearch: true
                    })
                }
            }
        },
        toggleRightColumnSearch() {
            if (this.openRightColumnSearch) {
                if (this.tableData3[0].isColumnSearch) {
                    this.tableData3.shift();
                }
                this.openRightColumnSearch = false
                this.rightColumnSearch = {}
            } else {
                this.openRightColumnSearch = true
                if (!this.tableData3[0].isColumnSearch) {
                    this.tableData3.unshift({
                        isColumnSearch: true
                    })
                }
            }
        },
        handleLeftColumnSearch() {
            console.log(this.leftColumnSearch)
            this.toggleLeftColumnSearch()
        },
        handleRightColumnSearch() {
            console.log(this.rightColumnSearch)
            this.toggleRightColumnSearch()
        }
    },
    mounted() {
        let currentId = this.$route.params.id
        console.log(currentId)
    },
    // 监听路由变化
    watch: {
        '$route' (to) {
            let currentId = to.params.id
            console.log(currentId)
        }
    }
}
</script>

<style lang="scss">
/* arrival unload */
.au-container {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    min-width: 1366px;
    min-height: 768px;
}

.au-header, .au-footer {
    line-height: 60px;
}

.au-main {
    padding-top: 0;
    padding-bottom: 0;
}

.au-main .el-button+.el-button {
    margin-left: 5px;
}

.au-block-title {
    height: 28px;
    line-height: 28px;
}

.au-add-site-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 100;
}

.au-del-site-btn {
    text-decoration: none;
    color: #409EFF;
}

.au-form-wrapper {
    padding: 10px;
    border: 1px solid #409EFF;
    .el-form-item__label {
        font-weight: bold;
    }
    .el-form-item {
        margin-bottom: 10px;
    }
}

.au-form-control {
    width: 145px;
    .el-input__inner {
        border: none;
        border-bottom: 1px solid #ccc;
        border-radius: 0;
    }
    &.el-date-editor {
        width: 145px;
    }
}

.au-checkbox-group {
    max-height: 300px;
    overflow-y: auto;
    .el-checkbox+.el-checkbox {
        margin-left: 0;
    }
}

.au-fast-form {
    .el-button {
        border: none;
        &:hover {
            border: none;
        }
    }
}

.w-116 {
    .el-form-item__label {
        width: 116px !important;
    }
}

/* css global util */
.flex-1 {
    flex: 1;
}

.flex-cloumn {
    display: flex;
    flex-direction: column;
}

.ml-10 {
    margin-left: 10px;
}

.mt-10 {
    margin-top: 10px;
}

.h-100 {
    height: 100%;
}

.posi-rela {
    position: relative;
}

.overflow-x-auto {
    overflow-x: auto;
}

.bottom-line {
    border-bottom: 1px solid  #dcdfe6;
}
</style>