<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="24">
                    <el-button>到货确认</el-button>
                    <el-select v-model="printOption" placeholder="打印">
                        <!-- <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option> -->
                        <el-option label="全部" value="all"></el-option>
                    </el-select>
                    <el-button>上传附件</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <!-- tab按钮 -->
            <el-col :span="24">
                <el-button>全部</el-button>
                <el-button>在途</el-button>
                <el-button>到达</el-button>
            </el-col>
            <!-- 表单筛选栏 -->
            <el-form :inline="true" :model="formFilter" class="demo-form-inline">
                <el-form-item label="合同号">
                    <el-input v-model="formFilter.user" ></el-input>
                </el-form-item>
                <el-form-item label="发车状态">
                    <el-select v-model="formFilter.region">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发车日期">
                    <el-col :span="11">
                    <el-date-picker type="date" v-model="formFilter.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">到</el-col>
                    <el-col :span="11">
                    <el-time-picker type="fixed-time" v-model="formFilter.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="网点">
                    <el-input v-model="formFilter.user" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 表格 -->
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    label="日期"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <el-col :span="24">
                <el-button>列选择</el-button>
                <el-button>列搜索</el-button>
                <el-button>导出</el-button>
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

            },
            tableData: []
        }
    },
    methods: {

    }
}
</script>

<style scoped lang="scss">
.el-header, .el-footer {
    background-color: #B3C0D1;
    line-height: 60px;
}

.el-main {
    flex: 1;
    background-color: #E9EEF3;
}

#app > .el-container {
    height: 100%;
}

</style>