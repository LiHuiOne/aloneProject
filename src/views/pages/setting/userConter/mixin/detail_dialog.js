const dialogData = [
    {
        key: 'userName',
        label: '姓名',
        type: 'text',
        placeholder: '请输入姓名',
        mStatus:true,
    },
    {
        key: 'age',
        label: '年龄',
        type: 'select',
        option: [
            { label: '10~15', value: 1 },
            { label: '15~20', value: 2 },
            { label: '20~25', value: 3 }
        ],
        placeholder: '请选择',
        mStatus:true,
    },
    {
        key: 'catory',
        label: '类型',
        type: 'radio',
        option: [
            { label: '商务', value: 1 },
            { label: '娱乐', value: 2 }
        ],
        mStatus:true,
    },
    {
        key:[],//多选框可以这样写，已在组建中做处理
        label: '活动',
        type: 'checkbox',
        option: [
            { label: '足球', value: 1 },
            { label: '垂钓', value: 2 }
        ],
        mStatus:true,
    },
    {
        key: 'time',
        label: '时间',
        type: 'text',
        placeholder: '请选择日期',
        mStatus:true,
    },
    {
        key: 'month',
        label: '月份',
        type: 'text',
        placeholder: '请选择月份',
        mStatus:true,
    },
    {
        key: 'date',
        label: '日期',
        type: 'text',
        placeholder: '选择日期',
        mStatus:true,
    },
    {
        key:'imgSrc',
        label: '上传',
        type: 'image',
        mStatus:true,
    },
    {
        key:'desc',
        label: '备注',
        type: 'textarea',
        placeholder: '请填写',
        mStatus:true,
    }
]
export default dialogData