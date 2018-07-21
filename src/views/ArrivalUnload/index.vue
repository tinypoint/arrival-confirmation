<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="6">
                    <el-button type="primary" plain>卸货</el-button>
                    <el-button type="primary" plain>二次发车</el-button>
                </el-col>
                <el-col :span="18">
                    <el-select style="width: 100px" v-model="printOption" placeholder="打印">
                        <!-- <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option> -->
                        <el-option label="全部" value="all"></el-option>
                    </el-select>
                    <el-button type="primary" plain class="ml-20">上传附件</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main class="flex-1 flex-cloumn">
            <!-- tab按钮 -->
            <el-row>
                <el-button @click="handleChangeTab('1')" :type="currentTab === '1'?'primary': ''" size="medium">派车</el-button>
                <el-button @click="handleChangeTab('2')" :type="currentTab === '2'?'primary': ''" size="medium">添加订单</el-button>
            </el-row>
            <el-row class="sub-container flex-1" v-if="currentTab==='1'">
                <el-form label-width="96px" size="small" :inline="true">
                    <el-form-item label="合同编号">
                        <el-input class="form-control-md-w" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="发车日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="派车状态">
                        <el-select class="form-control-sm-w" v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="制单人">
                        <el-input class="form-control-md-w" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="发货网点">
                        <el-input class="form-control-md-w" v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
                <el-row class="block-title">
                    调度信息：
                </el-row>
                <el-form label-width="96px" size="small" :inline="true">
                    <el-form-item label="委托类型">
                        <el-select class="form-control-sm-w" v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="承运商">
                        <el-input class="form-control-md-w" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="车牌号">
                        <el-input class="form-control-md-w" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="驾驶员">
                        <el-input class="form-control-md-w" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input class="form-control-md-w" v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
                <el-form label-width="96px" size="small" :inline="true">
                    <el-form-item label="备注">
                        <el-input style="width: 746px" v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
                <el-row class="block-title">
                    本单费用：
                </el-row>
                <el-form label-width="96px" size="small" :inline="true">
                    <el-form-item label="现付驾驶员">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="到付驾驶员">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="回付驾驶员">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
                <el-form label-width="96px" size="small" :inline="true">
                    <el-form-item label="油卡卡号">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="油卡公司">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="油卡驾驶员">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
                <el-form label-width="96px" size="small" :inline="true">
                    <el-form-item label="封布费">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="保险费">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="装卸费">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
                <el-form label-width="96px" size="small" :inline="true">
                    <el-form-item label="落地费">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="其他费用">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="其他费用说明">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
                <el-form label-width="96px" size="small" :inline="true">
                    <el-form-item label="费用合计">
                        <el-input style="width: 746px" v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row :gutter="10" class="sub-container flex-1" v-if="currentTab==='2'">
                <el-col class="overflow-x-auto h-100" :span="12">
                    <el-table
                        size="small"
                        ref="multipleTable"
                        :data="tableData1"
                        tooltip-effect="dark"
                        border
                        height="100%">
                        <el-table-column
                            type="selection"
                            width="60">
                        </el-table-column>
                        <el-table-column
                            label="序号"
                            prop='index'
                            width="60">
                        </el-table-column>
                        <el-table-column
                            label="运单号"
                            prop="id"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="到站"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="目的网点"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="发货单位"
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
                            label="应收合计"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="托运商单号"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="开单日期"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="运单状态"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="发站"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="发货网点"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="运输方式"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="发货人"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="发货人电话"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="发货地址"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="交接方式"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="收货单位"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="收货人"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="收货人电话"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="收货地址"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="提货费"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="运费"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="送货费"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="装卸费"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="声明价值"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="保价费"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="包装费"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="仓储费"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="其他费用"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="预付进仓费"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="实付进仓费"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="结算状态"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="回扣状态"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="回扣"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="应结算金额（应收合计-回扣）"
                            min-width="200">
                        </el-table-column>
                        <el-table-column
                            label="付款方式"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="现付状态"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="现付"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="到付状态"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="到付"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="发货月结状态"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="发货月结"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="收货月结状态"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="收货月结"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="欠付状态"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="欠付"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="回单付状态"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="回单付"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="货到打卡状态"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="货到打卡"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="贷款扣状态"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="贷款扣"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="制单人"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="回单份数"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            label="备注"
                            min-width="100">
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col class="flex-cloumn h-100" :span="12">
                    <el-row class="posi-rela" style="height: 200px; margin-bottom: 10px">
                        <el-button type="primary" size="small" class="add-site-btn">新增到货网点</el-button>
                        <el-table
                            size="small"
                            ref="multipleTable"
                            :data="tableData2"
                            tooltip-effect="dark"
                            border
                            height="100%">
                            <el-table-column
                                type="selection"
                                width="60">
                            </el-table-column>
                            <el-table-column
                                label="序号"
                                prop='index'
                                width="60">
                            </el-table-column>
                            <el-table-column
                                label="卸货网点"
                                prop='site'
                                width="100">
                            </el-table-column>
                            <el-table-column
                                label="单数"
                                prop='num'
                                width="100">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                width="100">
                                <template slot-scope="scope">
                                    <a class="del-site-btn" href="javascript:;" @click="handleDelete(scope.$index, scope.row)">删除</a>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row class="overflow-x-auto flex-1">
                        <el-table
                            size="small"
                            ref="multipleTable"
                            :data="tableData3"
                            tooltip-effect="dark"
                            border
                            height="100%">
                            <el-table-column
                                type="selection"
                                width="60">
                            </el-table-column>
                            <el-table-column
                                label="序号"
                                prop='index'
                                width="60">
                            </el-table-column>
                            <el-table-column
                                label="运单号"
                                prop="id"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="托运商单号"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="开单日期"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="运单状态"
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
                                label="运输方式"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="发货单位"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="发货人"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="发货人电话"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="发货地址"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="交接方式"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="收货单位"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="收货人"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="收货人电话"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="收货地址"
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
                                label="提货费"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="运费"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="送货费"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="装卸费"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="声明价值"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="保价费"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="包装费"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="仓储费"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="其他费用"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="预付进仓费"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="实付进仓费"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="结算状态"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="回扣状态"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="回扣"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="应结算金额（应收合计-回扣）"
                                min-width="200">
                            </el-table-column>
                            <el-table-column
                                label="付款方式"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="现付状态"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="现付"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="到付状态"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="到付"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="发货月结状态"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="发货月结"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="收货月结状态"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="收货月结"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="欠付状态"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="欠付"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="回单付状态"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="回单付"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="货到打卡状态"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="货到打卡"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="贷款扣状态"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="贷款扣"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="制单人"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="回单份数"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                label="备注"
                                min-width="100">
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>
            <el-row>
                <el-col :span="12">
                    <el-button type="info" size="mini">列选择</el-button>
                    <el-button type="info" size="mini">列搜索</el-button>
                    <el-button type="info" size="mini">导出</el-button>
                </el-col>
                <el-col :span="12">
                    <el-button type="info" size="mini">列选择</el-button>
                    <el-button type="info" size="mini">列搜索</el-button>
                    <el-button type="info" size="mini">导出</el-button>
                </el-col>
            </el-row>
        </el-footer>
        <el-dialog :visible.sync="dialogTableVisible">
            <el-table
                size="small"
                ref="multipleTable"
                :data="tableData1"
                tooltip-effect="dark"
                border
                show-summary
                :summary-method="handleSummary"
                height="300">
                <el-table-column
                    type="selection"
                    width="60">
                </el-table-column>
                <el-table-column
                    label="序号"
                    prop='index'
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
    </el-container>
</template>

<script>

export default {
    data () {
        return {
            currentTab: '2',
            printOption: '',
            dialogTableVisible: true,
            form: {

            },
            tableData1: [
                {
                    index: 1,
                    id: 18040001
                },
                {
                    index: 1,
                    id: 18040001
                },
                {
                    index: 1,
                    id: 18040001
                },
                {
                    index: 1,
                    id: 18040001
                },
                {
                    index: 1,
                    id: 18040001
                },{
                    index: 1,
                    id: 18040001
                },{
                    index: 1,
                    id: 18040001
                },{
                    index: 1,
                    id: 18040001
                }
            ],
            tableData2: [
                {
                    index: 1,
                    site: '温州网点',
                    num: 20
                },{
                    index: 1,
                    site: '温州网点',
                    num: 20
                },{
                    index: 1,
                    site: '温州网点',
                    num: 20
                },{
                    index: 1,
                    site: '温州网点',
                    num: 20
                },{
                    index: 1,
                    site: '温州网点',
                    num: 20
                },{
                    index: 1,
                    site: '温州网点',
                    num: 20
                },{
                    index: 1,
                    site: '温州网点',
                    num: 20
                },{
                    index: 1,
                    site: '温州网点',
                    num: 20
                }
            ],
            tableData3: [
                {
                    index: 1,
                    id: 18040001
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
            ]
        }
    },
    methods: {
        // 切换 ‘派车’ he1 ‘添加订单’
        handleChangeTab(tab) {
            this.currentTab = tab
        },
        // 左侧列表下方的总结行的数据需要这个函数给返回
        handleSummary(param) {
            const sums = ['汇总', 1, 2, 100, 401, 131]

            return sums
        },
        // 右上角列表删除操作
        handleDelete(index, date) {

        }
    },
    mounted() {
        let currentId = this.$route.params.id
    },
    // 监听路由变化
    watch: {
        '$route' (to, from) {
            let currentId = to.params.id
        }
    }
}
</script>

<style scoped lang="scss">
.block-title {
    height: 60px;
}

.sub-container {
    margin-top: 20px;
}

.add-site-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 100;
}

.del-site-btn {
    text-decoration: none;
    color: #409EFF;
}
</style>