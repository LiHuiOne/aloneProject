export default {
    data() {
        return {
            orgOption: []
        }
    },
    computed: {
        searchData(){
            return[
                {
                    key:'userName',
                    label:'姓名',
                    type:'text',
                    placeholder:'请输入姓名'
                },
                {
                    key:'age',
                    label:'年龄',
                    type:'select',
                    option:[
                        {label:'10~15',value:1},
                        {label:'15~20',value:2},
                        {label:'20~25',value:3}
                    ],
                    placeholder:'请选择'
                },
                {
                    key:['startTime','endTime'],
                    label:'时间',
                    type:'date',
                    placeholder:'请选择日期',
                },
                {
                    key:['startMouth','endMouth'],
                    label:'月份',
                    type:'month',
                    placeholder:'请选择月份',
                    startTime:'',
                    endTime:''
                },
                {
                    key:['startDate','endDate'],
                    label:'日期',
                    type:'ydate',
                    placeholder:'选择日期',
                    startTime:'',
                    endTime:''
                },
                {
                    key:'keyId',
                    label:'组织',
                    type:'select-remote',
                    placeholder:'请输入关键字',
                    option:this.orgOption,
                    method: this.orgMethod
                }
            ]
        }
    },
    methods: {
        //组织查询列表
        async orgMethod(query) {
            if (query !== '') {
                let params = {
                    orgName: query
                }
                // const data = await this.$api.getOrgsSelect(params);
                // this.orgOption = data.datas.content.map(v => {
                //     return {label: v.orgName, value: v.orgId}
                // })
            }
        }
    }
}