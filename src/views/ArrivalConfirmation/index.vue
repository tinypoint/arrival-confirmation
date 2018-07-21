<template>
    <el-container class="ac-container">
        <el-header class="ac-header bottom-line">
            <el-row>
                <el-col :span="4">
                    <el-button size="mini" type="primary" plain>到货确认</el-button>
                </el-col>
                <el-col :span="20">
                    <el-select size="mini" style="width: 100px" v-model="printOption" placeholder="打印">
                        <el-option label="装车清单" value="0"></el-option>
                        <el-option label="发车清单" value="1"></el-option>
                        <el-option label="随车清单" value="2"></el-option>
                    </el-select>
                    <el-button size="mini" type="primary" plain class="ml-10">上传附件</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main class="ac-main flex-1 flex-cloumn pd-10">
            <!-- tab按钮 -->
            <el-row class="bottom-line mt-10">
                <el-button size="medium">全部</el-button>
                <el-button size="medium">在途</el-button>
                <el-button size="medium">到达</el-button>
            </el-row>
            <!-- 表单筛选栏 -->
            <el-form size="mini" :inline="true" :model="formFilter" class="form-wrapper">
                <el-form-item label="合同号">
                    <el-input placeholder="请输入合同号" v-model="formFilter.contractId" ></el-input>
                </el-form-item>
                <el-form-item label="发车状态">
                    <el-select placeholder="请选择" style="width: 120px" v-model="formFilter.carStatus">
                        <el-option label="全部" value="all"></el-option>
                        <el-option label="已调度" value="dispatched"></el-option>
                        <el-option label="已装车" value="loaded"></el-option>
                        <el-option label="已发车" value="started"></el-option>
                        <el-option label="已到货" value="arrivaled"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发车日期">
                    <el-col :span="11">
                        <el-date-picker type="date" v-model="formFilter.startDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="ac-line" :span="2">到</el-col>
                    <el-col :span="11">
                        <el-date-picker type="date" v-model="formFilter.endDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="网点">
                    <el-input placeholder="请输入网点" v-model="formFilter.site" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleClickSearch" size="mini" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 表格 -->
            <el-table
                size="small"
                ref="multipleTable"
                :data="tableData"
                border
                show-summary
                style="width: 100%"
                height="100%"
                @row-dblclick="handleClickRow">
                <el-table-column
                    type="selection"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="序号"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="合同号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="发车日期">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="发车状态">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="发车网点">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="卸货网点">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="车牌号">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="联系方式">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="调度员">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="总件数">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="总重量（公斤）">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="总体积（立方）">
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer class="ac-footer">
            <el-col :span="24">
                <el-button type="info" size="mini">列选择</el-button>
                <el-button type="info" size="mini">列搜索</el-button>
                <el-button type="info" size="mini">导出</el-button>
            </el-col>
        </el-footer>
    </el-container>
</template>

<script>

export default {
    data () {
        return {
            printOption: '',
            formFilter: {
                contractId: '',
                carStatus: '',
                startDate: '',
                endDate: '',
                site: ''
            },
            tableData: [{
                id: '1',
                name: '王小虎',
                address: '上海市 1518 弄'
            }, {
                id: '1',
                name: '王小虎',
                address: '上海市 1517 弄'
            }, {
                id: '1',
                name: '王小虎',
                address: '上海市 1517 弄'
            }, {
                id: '1',
                name: '王小虎',
                address: '上海市 1519 弄'
            }, {
                id: '1',
                name: '王小虎',
                address: '上海市 1516 弄'
            }, {
                id: '1',
                name: '王小虎',
                address: '上海市 1518 弄'
            }, {
                id: '1',
                name: '王小虎',
                address: '上海市 1517 弄'
            }, {
                id: '1',
                name: '王小虎',
                address: '上海市 1519 弄'
            }, {
                id: '1',
                name: '王小虎',
                address: '上海市 1516 弄'
            }]
        }
    },
    methods: {
        handleClickSearch() {
            console.log(this.formFilter)
        },
        // 点击列表某一行时触发
        handleClickRow(row, event, column) {
            let id = row.id
            this.$router.push({ name: 'arrivalUnload', params: { id }})
        }
    }
}
</script>

<style lang="scss">
/* arrival confirmation */
.ac-container {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    min-width: 1366px;
    min-height: 768px;
}

.ac-header, .ac-footer {
    line-height: 60px;
}

.ac-main {
    padding-top: 0;
    padding-bottom: 0;
}

.ac-main .el-button+.el-button {
    margin-left: 5px;
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
    margin-top: 20px;
}

.ac-line {
    color: #606266;
    text-align: center;
}

.form-wrapper {
    margin: 5px 0;
    .el-form-item {
        margin-bottom: 0px;
        font-weight: bold;
    }
}

.bottom-line {
    border-bottom: 1px solid  #dcdfe6;
}
</style>