const dialogData = [
    {
        key: 'userName',
        label: '姓名',
        type: 'text',
        placeholder: '请输入姓名',
        mStatus:false,
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
        mStatus:false,
    },
    {
        key: 'catory',
        label: '类型',
        type: 'radio',
        option: [
            { label: '商务', value: 1 },
            { label: '娱乐', value: 2 }
        ],
        mStatus:false,
    },
    {
        key:[],//多选框可以这样写，已在组建中做处理
        label: '活动',
        type: 'checkbox',
        option: [
            { label: '足球', value: 1 },
            { label: '垂钓', value: 2 }
        ],
        mStatus:false,
    },
    {
        key: ['startTime', 'endTime'],
        label: '时间',
        type: 'date',
        placeholder: '请选择日期',
        mStatus:false,
    },
    {
        key: ['startMouth', 'endMouth'],
        label: '月份',
        type: 'month',
        placeholder: '请选择月份',
        mStatus:false,
    },
    {
        key: ['startDate', 'endDate'],
        label: '日期',
        type: 'ydate',
        placeholder: '选择日期',
        mStatus:false,
    },
    {
        key:'imgSrc',
        label: '上传',
        type: 'image',
        mStatus:false,
    },
    {
        key:'desc',
        label: '备注',
        type: 'textarea',
        placeholder: '请填写',
        mStatus:false,
    }
]
export default dialogData