export default{
    data(){
       
    },
    computed: {
        tableClunmData(){
            return[
                {
                    prop:'date',
                    label:'日期'
                },
                {
                    prop:'userName',
                    label:'姓名'
                },
                {
                    prop:'address',
                    label:'地址'
                },
            ]
        }
    },
}