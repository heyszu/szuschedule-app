<template>
    <div id="landpage">
        <s-header :weekOdd="week_odd" @switchSingleWeek="switchSingleWeek"/>
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
                        ['type' + item.classInfo.section_order]: true,
                        [item._id]: true }"
                    :style="getCustomBackground(item.empty, item._id)"
                    @touchstart="tapedStart($event)"
                    @touchend="tapedEnd(item._id, $event)">
                    <p v-if="!item.empty">
                        {{ item.classInfo.course_name }}<br />
                        @{{ '' + item.classInfo.class_location }}
                    </p>
                </div>
            </div>
        </div>
        <s-detail :detail="activeId" :visible="showDetailFlag" @closer="parentsCloser" @newColor="newCustomColor"/>
    </div>
</template>

<script>
import http from 'axios'
import config from '../config'
import sHeader from '../partials/sHeader'
import sDetail from '../partials/sDetail'
import store from '../vuex/store'
import renderer from '../lib/renderer'

export default {
    data () {
        return {
            schedule: {},
            numberToChinese: ['一', '二', '三', '四', '五'],
            week_odd: 2,
            custom: {},
            activeId: '',
            showDetailFlag: false,
            tapInfo: [0, 0]
        }
    },
    async mounted () {
        if (!store.isLogin && !store.isPreLogin) {
            this.$router.push('login')
            return
        }

        if (window.StatusBar) {
            window.StatusBar.styleBlackOpaque()
        }

        // 获取单双周
        this.weekOddGen()

        // 载入个性化设置
        this.loadCustomConfig()

        // 渲染课程表
        this.render()

        if (window.navigator.splashscreen) {
            window.navigator.splashscreen.hide()
        }

        document.addEventListener('deviceready', function () {
            // 统计
            if (window.device) {
                http.post(config.api + '/analysis/devices', window.device)
            }
        }, false)
    },
    methods: {
        tapedStart (e) {
            this.tapInfo[0] = e.touches[0].pageX
            this.tapInfo[1] = e.touches[0].pageY
        },
        tapedEnd (_id, e) {
            if (!_id) return
            if (e.changedTouches[0].pageX === this.tapInfo[0] &&
                e.changedTouches[0].pageY === this.tapInfo[1]) {
                this.activeId = _id
                this.showDetailFlag = true
            }
        },
        // 渲染函数
        render () {
            this.schedule = renderer(store.schedule, this.week_odd)
        },
        getCustomBackground (isEmpty, _id) {
            if (!isEmpty) {
                if (this.custom[_id] && this.custom[_id].style.background) {
                    return {
                        background: this.custom[_id].style.background
                    }
                } else {
                    return {
                        background: '#52596b'
                    }
                }
            } else {
                return {
                    background: 'rgba(94, 142, 214, 0.05);'
                }
            }
        },
        loadCustomConfig () {
            const custom = window.localStorage.getItem('custom')
            if (custom) {
                // console.log(JSON.parse(custom))
                this.custom = JSON.parse(custom)
            } else {
                window.localStorage.setItem('custom', JSON.stringify({}))
            }
        },
        parentsCloser () {
            this.showDetailFlag = false
        },
        newCustomColor (color, _id) {
            if (!this.custom[_id]) {
                this.custom[_id] = {
                    style: {
                        background: color
                    },
                    classInfo: {}
                }
            } else {
                if (this.custom[_id].style) {
                    this.custom[_id].style.background = color
                } else {
                    this.custom[_id].style = {
                        background: color
                    }
                }
            }

            this.render()

            window.localStorage.setItem('custom', JSON.stringify(this.custom))
        },
        switchSingleWeek () {
            this.week_odd = (this.week_odd === 2) ? 1 : 2
        },
        weekOddGen () {
            let date = new Date()
            let date2 = new Date(date.getFullYear(), 0, 1)
            let today = Math.floor((date - date2) / (24 * 60 * 60 * 1000)) + 1
            this.week_odd = ((Math.floor(today / 7) - 34) % 2 === 0) ? 2 : 1
        }
    },
    watch: {
        week_odd () {
            this.schedule = renderer(store.schedule, this.week_odd)
        }
    },
    components: {
        sHeader,
        sDetail
    }
}
</script>

<style lang="less" scoped>
@import '../assets/stylesheet/landpage.less';
</style>
