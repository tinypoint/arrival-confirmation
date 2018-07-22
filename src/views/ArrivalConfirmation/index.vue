<template>
    <el-container class="ac-container">
        <el-header class="ac-header bottom-line">
            <el-row>
                <el-col :span="4">
                    <el-button size="mini" type="primary" plain>到货确认</el-button>
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
        <el-main class="ac-main flex-1 flex-cloumn pd-10">
            <!-- tab按钮 -->
            <el-row class="bottom-line mt-10">
                <el-button size="medium">全部</el-button>
                <el-button size="medium">在途</el-button>
                <el-button size="medium">到达</el-button>
            </el-row>
            <!-- 表单筛选栏 -->
            <el-form :inline="true" :model="formFilter" class="form-wrapper" size="mini">
                <el-form-item label="合同号">
                    <el-input v-model="formFilter.contractId" placeholder="请输入合同号" ></el-input>
                </el-form-item>
                <el-form-item label="发车状态">
                    <el-select v-model="formFilter.carStatus" placeholder="请选择" style="width: 120px">
                        <el-option label="全部" value="all"></el-option>
                        <el-option label="已调度" value="dispatched"></el-option>
                        <el-option label="已装车" value="loaded"></el-option>
                        <el-option label="已发车" value="started"></el-option>
                        <el-option label="已到货" value="arrivaled"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发车日期">
                    <el-col :span="11">
                        <el-date-picker v-model="formFilter.startDate" type="date"  style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col :span="2" class="ac-line">到</el-col>
                    <el-col :span="11">
                        <el-date-picker v-model="formFilter.endDate" type="date" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="网点">
                    <el-input v-model="formFilter.site" placeholder="请输入网点"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" type="primary" @click="handleClickSearch">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 表格 -->
            <el-table
                ref="multipleTable"
                :data="tableData"
                size="small"
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
                    prop="index"
                    label="序号"
                    width="60">
                    <template slot-scope="scope">
                        <el-input v-if="scope.$index === 0 && openColumnSearch" v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="choosenColumns.indexOf('合同号') > -1"
                    prop="contractId"
                    label="合同号"
                    width="120">
                    <template slot-scope="scope">
                        <el-input v-if="scope.$index === 0 && openColumnSearch" v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="choosenColumns.indexOf('发车日期') > -1"
                    prop="address"
                    label="发车日期">
                    <template slot-scope="scope">
                        <el-input v-if="scope.$index === 0 && openColumnSearch" v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="choosenColumns.indexOf('发车状态') > -1"
                    prop="address"
                    label="发车状态">
                    <template slot-scope="scope">
                        <el-input v-if="scope.$index === 0 && openColumnSearch" v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="choosenColumns.indexOf('发车网点') > -1"
                    prop="address"
                    label="发车网点">
                    <template slot-scope="scope">
                        <el-input v-if="scope.$index === 0 && openColumnSearch" v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="choosenColumns.indexOf('卸货网点') > -1"
                    prop="address"
                    label="卸货网点">
                    <template slot-scope="scope">
                        <el-input v-if="scope.$index === 0 && openColumnSearch" v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="choosenColumns.indexOf('车牌号') > -1"
                    prop="address"
                    label="车牌号">
                    <template slot-scope="scope">
                        <el-input v-if="scope.$index === 0 && openColumnSearch" v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="choosenColumns.indexOf('联系方式') > -1"
                    prop="address"
                    label="联系方式">
                    <template slot-scope="scope">
                        <el-input v-if="scope.$index === 0 && openColumnSearch" v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="choosenColumns.indexOf('调度员') > -1"
                    prop="address"
                    label="调度员">
                    <template slot-scope="scope">
                        <el-input v-if="scope.$index === 0 && openColumnSearch" v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="choosenColumns.indexOf('总件数') > -1"
                    prop="address"
                    label="总件数">
                    <template slot-scope="scope">
                        <el-input v-if="scope.$index === 0 && openColumnSearch" v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="choosenColumns.indexOf('总重量（公斤）') > -1"
                    prop="address"
                    label="总重量（公斤）">
                    <template slot-scope="scope">
                        <el-input v-if="scope.$index === 0 && openColumnSearch" v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="choosenColumns.indexOf('总体积（立方）') > -1"
                    prop="address"
                    label="总体积（立方）">
                    <template slot-scope="scope">
                        <el-input v-if="scope.$index === 0 && openColumnSearch" v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        <span v-else>{{ scope.row[scope.column.property] }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer class="ac-footer">
            <el-col :span="24">
                <el-button type="info" size="mini" @click="dialogChooseColumnVisible = true">列选择</el-button>
                <el-button type="info" size="mini" @click="toggleColumnSearch">列搜索</el-button>
                <el-button type="info" size="mini">导出</el-button>
            </el-col>
        </el-footer>
        <el-dialog :visible.sync="dialogChooseColumnVisible" title="列选择">
            <el-checkbox-group v-model="choosenColumns" class="ac-checkbox-group flex-cloumn">
                <el-checkbox v-for="column in columns" :label="column" :key="column">{{column}}</el-checkbox>
            </el-checkbox-group>
        </el-dialog>
    </el-container>
</template>

<script>
const columns = [
    "合同号",
    "发车日期",
    "发车状态",
    "发车网点",
    "卸货网点",
    "车牌号",
    "联系方式",
    "调度员",
    "总件数",
    "总重量（公斤）",
    "总体积（立方）"
]
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
                index: '1',
                contractId: '18004001',
                address: '上海市 1518 弄'
            }, {
                index: '1',
                contractId: '18004001',
                address: '上海市 1518 弄'
            }],
            dialogChooseColumnVisible: false,
            form: {},
            columns: columns,
            choosenColumns: [...columns],
            openColumnSearch: false,
            columnSearch: {}
        }
    },
    methods: {
        handleClickSearch() {
            console.log(this.formFilter)
        },
        // 点击列表某一行时触发
        handleClickRow(row) {
            let id = row.id
            this.$router.push({ name: 'arrivalUnload', params: { id }})
        },
        // 列查询
        toggleColumnSearch() {
            if (this.openColumnSearch) {
                if (this.tableData[0].isColumnSearch) {
                    this.tableData.shift();
                }
                this.openColumnSearch = false
                this.columnSearch = {}
            } else {
                this.openColumnSearch = true
                if (!this.tableData[0].isColumnSearch) {
                    this.tableData.unshift({
                        isColumnSearch: true
                    })
                }
            }
        },
        handleColumnSearch() {
            console.log(this.columnSearch)
            this.columnSearch = {}
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

.ac-checkbox-group {
    max-height: 300px;
    overflow-y: auto;
    .el-checkbox+.el-checkbox {
        margin-left: 0;
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