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
                <el-button size="medium" @click="handleChangeTab('0')">全部</el-button>
                <el-button size="medium" @click="handleChangeTab('1')">在途</el-button>
                <el-button size="medium" @click="handleChangeTab('2')">到达</el-button>
            </el-row>
            <!-- 表单筛选栏 -->
            <el-form :inline="true" :model="formFilter" class="form-wrapper" size="mini">
                <el-form-item label="合同号">
                    <el-input v-model="formFilter.contractId" placeholder="请输入合同号" ></el-input>
                </el-form-item>
                <el-form-item label="发车状态">
                    <el-select v-model="formFilter.carStatus" :clearable="true" placeholder="请选择" style="width: 120px">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="已调度" value="已调度"></el-option>
                        <el-option label="已装车" value="已装车"></el-option>
                        <el-option label="已发车" value="已发车"></el-option>
                        <el-option label="已到货" value="已到货"></el-option>
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
                    <el-input v-model="formFilter.startSite" placeholder="请输入网点"></el-input>
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
                    v-for="item in tableColumns"
                    v-if="choosenColumns.indexOf(item.label) > -1"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width">
                    <template slot-scope="scope">
                        <div v-if="scope.$index === 0 && openColumnSearch">
                            <el-date-picker v-if="item.type==='date'" v-model="columnSearch[scope.column.property]" size="mini" type="date" style="width:100%;" @change="handleColumnSearch"></el-date-picker>
                            <el-select v-else-if="item.type==='select'" v-model="columnSearch[scope.column.property]" :clearable="true" size="mini" placeholder="请选择" @change="handleColumnSearch">
                                <el-option
                                v-for="s in item.selectOptions"
                                :key="s.value"
                                :label="s.label"
                                :value="s.value">
                                </el-option>
                            </el-select>
                             <el-input v-else="item.type==='input'" v-model="columnSearch[scope.column.property]" size="mini" @keyup.enter.native="handleColumnSearch"></el-input>
                        </div>
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
                <el-checkbox v-for="column in tableColumns" :label="column.label" :key="column.label">{{column.label}}</el-checkbox>
            </el-checkbox-group>
        </el-dialog>
    </el-container>
</template>

<script>
const tableColumns = [
    {
        label: '序号',
        prop: 'index',
        width: 60
    },
    {
        label: '合同号',
        prop: 'contractId'
    },
    {
        label: '发车日期',
        prop: 'startDate',
        width: 200,
        type: 'date'
    },
    {
        label: '发车状态',
        prop: 'carStatus',
        type: 'select',
        selectOptions: [
            {
                label: '已调度',
                value: '已调度'
            },
            {
                label: '已装车',
                value: '已装车'
            },
            {
                label: '已发车',
                value: '已发车'
            },
            {
                label: '已到货',
                value: '已到货'
            }
        ]
    },
    {
        label: '发车网点',
        prop: 'startSite'
    },
    {
        label: '卸货网点',
        prop: 'prop3'
    },
    {
        label: '车牌号',
        prop: 'prop4'
    },
    {
        label: '联系方式',
        prop: 'prop5'
    },
    {
        label: '调度员',
        prop: 'prop6'
    },
    {
        label: '总件数',
        prop: 'prop7'
    },
    {
        label: '总重量（公斤）',
        prop: 'prop8'
    },
    {
        label: '总体积（立方）',
        prop: 'prop9'
    }
]
const mockData = [{
    index: '1',
    contractId: '18004001',
    startDate: '2018-7-29',
    carStatus: '已调度',
    startSite: 'C点',
    prop3: 'A点',
    prop4: '沪A123456',
    prop5: '19250987908',
    prop6: '李四',
    prop7: '200',
    prop8: '20',
    prop9: '40'
}, {
    index: '2',
    contractId: '18004002',
    startDate: '2018-2-19',
    carStatus: '已调度',
    startSite: 'B点',
    prop3: 'A点',
    prop4: '沪B123456',
    prop5: '19279085098',
    prop6: '张三',
    prop7: '500',
    prop8: '20',
    prop9: '50'
}, {
    index: '3',
    contractId: '18004003',
    startDate: '2018-1-19',
    carStatus: '已发车',
    startSite: 'C点',
    prop3: 'D点',
    prop4: '沪B123456',
    prop5: '19250987908',
    prop6: '张三',
    prop7: '200',
    prop8: '20',
    prop9: '40'
}, {
    index: '4',
    contractId: '18004004',
    startDate: '2018-9-19',
    carStatus: '已发车',
    startSite: 'H点',
    prop3: 'A点',
    prop4: '沪A123456',
    prop5: '19279085098',
    prop6: '李四',
    prop7: '500',
    prop8: '20',
    prop9: '50'
}]

function date2String(date) {
    let _date = new Date(date)
    return `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`
}

function string2Date(date) {
    let _date = date.split('-')

    return new Date(parseInt(_date[0], 10), parseInt(_date[1], 10) - 1, parseInt(_date[2], 10))
}

function compareDate(a, b) {
    if (typeof a === 'string') {
        a = string2Date(a)
    }

    if (typeof b === 'string') {
        b = string2Date(b)
    }
    return (a.getTime() - b.getTime())
}

function isNotEmpty(v) {
    return typeof v !== 'undefined' &&  v !== null && v !== ''
}

export default {
    data () {
        return {
            printOption: '',
            currentTab: 0,
            formFilter: {
                contractId: '',
                carStatus: '',
                startDate: '',
                endDate: '',
                startSite: ''
            },
            tableData: mockData.slice(),
            cachedDate: mockData.slice(),
            // 列选择dialog开关
            dialogChooseColumnVisible: false,
            // 列表表头数据
            tableColumns: tableColumns,
            choosenColumns: [...tableColumns.map(column => column.label)],
            openColumnSearch: false,
            columnSearch: {}
        }
    },
    methods: {
        handleChangeTab(tabIndex) {
            this.currentTab = tabIndex
            // do something
        },
        handleClickSearch() {
            let { contractId, carStatus, startDate, endDate, startSite } = this.formFilter

            let result = mockData.filter(item => {
                if (isNotEmpty(contractId) && item.contractId.indexOf(contractId) < 0) {
                    return false
                }
                if (isNotEmpty(carStatus) && (carStatus !== '全部') && item.carStatus.indexOf(carStatus) < 0) {
                    return false
                }
                if (isNotEmpty(startSite) && item.startSite.indexOf(startSite) < 0) {
                    return false
                }
                if (isNotEmpty(startDate) && isNotEmpty(endDate)) {
                    if (!((compareDate(item.startDate, startDate) >= 0) && (compareDate(endDate, item.startDate) >= 0))) {
                        return false
                    }
                } else if (isNotEmpty(startDate) && (compareDate(item.startDate, startDate) < 0)) {
                    return false
                } else if (isNotEmpty(endDate) && (compareDate(endDate, item.startDate) < 0)) {
                    return false
                }

                return true
            })

            this.tableData = (this.openColumnSearch ? [{
                isColumnSearch: true
            }] : [] ).concat(result)

            this.formFilter = {
                contractId: '',
                carStatus: '',
                startDate: '',
                endDate: '',
                startSite: ''
            }
            this.cachedDate = result.slice();
        },
        // 点击列表某一行时触发
        handleClickRow(row) {
            let id = row.contractId
            this.$router.push({ name: 'arrivalUnload', params: { id }})
        },
        // 点击列查询按钮
        toggleColumnSearch() {
            if (this.openColumnSearch) {
                if (this.tableData[0] || this.tableData[0].isColumnSearch) {
                    this.tableData.shift();
                }
                this.openColumnSearch = false
                this.columnSearch = {}
            } else {
                this.openColumnSearch = true
                if (this.tableData.length === 0 || !this.tableData[0].isColumnSearch) {
                    this.tableData.unshift({
                        isColumnSearch: true
                    })
                }
            }
        },
        // 进行列查询
        handleColumnSearch() {
            let values = Object.values(this.columnSearch);
            let isEmpty = values.every(value => {
                return typeof value === undefined || value === '' || value === null
            }) || values.length === 0

            if (isEmpty) {
                this.columnSearch = {}

                this.tableData = (this.openColumnSearch ? [{
                    isColumnSearch: true
                }] : [] ).concat(this.cachedDate)
            }
            
            let result = this.cachedDate.filter(item => {
                if (item.isColumnSearch) {
                    return true
                }
                for (let key in this.columnSearch) {
                    if (this.columnSearch[key] === '') {
                        // do nothing
                    } else if (this.columnSearch[key] instanceof Date) {
                        let date = new Date(this.columnSearch[key])
                        let formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                        if (item[key] !== formatDate) {
                            return false
                        }
                    } else if (item[key].indexOf(this.columnSearch[key]) < 0) {
                        return false
                    }
                }
                return true
            })

            this.tableData = (this.openColumnSearch ? [{
                isColumnSearch: true
            }] : [] ).concat(result)
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