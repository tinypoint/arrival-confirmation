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
                <el-button @click="handleChangeTab('派车')" :type="currentTab === '派车'?'primary': ''" size="medium">派车</el-button>
                <el-button @click="handleChangeTab('添加订单')" :type="currentTab === '添加订单'?'primary': ''" size="medium">添加订单</el-button>
            </el-row>
            <el-row class="sub-container flex-1" v-if="currentTab==='派车'">
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
            <el-row class="sub-container flex-1" v-if="currentTab==='添加订单'">
                <el-col :span="12">
                    <el-table
                        size="small"
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        border
                        show-summary
                        :summary-method="handleSummary"
                        style="width: 100%"
                        height="100%">
                        <el-table-column
                            align="center"
                            type="selection"
                            width="60">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="序号"
                            width="60">
                            <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="name"
                            label="合同号"
                            width="120"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="address"
                            label="发车日期"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="address"
                            label="发车状态"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="address"
                            label="发车网点"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="address"
                            label="卸货网点"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="address"
                            label="车牌号"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="address"
                            label="联系方式"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="address"
                            label="调度员"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="address"
                            label="总件数"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="address"
                            label="总重量（公斤）"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="address"
                            label="总体积（立方）"
                            show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="12">
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>

export default {
    data () {
        return {
            currentTab: '派车',
            printOption: '',
            form: {

            },
            tableData: [{
                date: '1',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '1',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods: {
        handleChangeTab(tab) {
            this.currentTab = tab
        },
        handleSummary() {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总价';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                    }, 0);
                    sums[index] += ' 元';
                } else {
                    sums[index] = 'N/A';
                }
            });

            return sums;
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
</style>