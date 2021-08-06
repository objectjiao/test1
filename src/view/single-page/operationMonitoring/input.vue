<template>
        <div>
            <slot :slotData="slotData">
                {{slotData.data}}
            </slot>
        </div>
</template>

<script>
    export default {
        name: "input",
        model:{
          prop:'text',
          event:'change1'
        },
        props:{
            text:{
                type:String,
                default:'1231999'
            }
        },
        data(){
            return{
                slotData:{
                    data:"123123123"
                }
            }
        },
        mounted(){
            console.log(this.text);
        }
    }
</script>

<style scoped>

</style>
