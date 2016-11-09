<template>
    <div id="landpage">
        <s-header />
        <div class="schedule">
            <div class="col col1">
                <!-- Render left list -->
                <div class="class title" v-for="(v, i) in Array(13).fill(0)" :class="{ head: i === 0 }">
                    <p>{{ (i === 0) ? '　' : i }}</p>
                </div>
            </div>
            <div class="col" v-for="(v, i) in schedule" :class="'day' + (i + 1)">
                <div class="class title head"><p>{{ numberToChinese[i] }}</p></div>
                <div class="class normal"
                    v-for="(item, index) in v"
                    v-if="item.visible"
                    :class="{
                        empty: item.empty,
                        normalClass: !item.empty,
                        ['type' + item.classInfo.section_order]: true }"
                    v-tap="{ methods:showDetail , _id: item._id }">
                    <p v-if="!item.empty">{{ item.classInfo.course_name }}<br />@{{ '' + item.classInfo.class_location }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sHeader from '../partials/sHeader'
import store from '../vuex/store'
import renderer from '../lib/renderer'

export default {
    data () {
        return {
            schedule: {},
            numberToChinese: ['一', '二', '三', '四', '五'],
            week_odd: 2,
            lastTouches: []
        }
    },
    async mounted () {
        if (!store.isLogin && !store.isPreLogin) {
            this.$router.push('login')
            return
        }

        if (window.StatusBar) {
            window.StatusBar.styleDefault()
        }

        // 渲染课程表
        this.render()
    },
    methods: {
        showDetail (params) {
            if (!params._id) return
            console.log(params._id)
        },
        // 渲染函数
        render () {
            this.schedule = renderer(store.schedule, this.week_odd)
        }
    },
    watch: {
        week_odd () {
            this.schedule = renderer(store.schedule, this.week_odd)
        }
    },
    components: {
        sHeader
    }
}
</script>

<style lang="less" scoped>
@import '../assets/stylesheet/landpage.less';
</style>
