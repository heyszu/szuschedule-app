<template>
    <div class="detail-container">
        <div class="detail" :class="{ slideIn: visible }">
            <div class="main-content">
                <div class="colorPicker">
                    <div class="itemContainer" v-for="color in colors"
                        v-tap="{ methods: changeColor, color: color }">
                        <span class="item"
                            :style="{ background: color }"
                            :class="{ checked: isActive(color) }">
                        </span>
                    </div>
                </div>
                <h1 class="course_name">{{ classInfo.course_name }}</h1>
                <p class="professor">{{ classInfo.professor }}</p>
                <div class="classInfo">
                    <div class="localImage" :style="{
                        backgroundImage: 'url(./static/localimage/' + getLocalImage(classInfo.class_location) + ')'
                    }">
                        <div class="location">{{ classInfo.class_location }}</div>
                    </div>
                    <div class="infomations">
                        <p><span class="title">周数：</span>{{ classInfo.week_end - classInfo.week_begin }}</p>
                        <p><span class="title">学分：</span>{{ classInfo.course_credit }}</p>
                        <p><span class="title">类别：</span>{{ classInfo.course_class }}</p>
                        <p><span class="title">考核：</span>{{ classInfo.exam_mode }}</p>
                        <p><span class="title">学院：</span>{{ classInfo.offer_unit }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mask" v-show="visible" v-tap="{ methods: closeDetail }"></div>
    </div>
</template>

<script>
import colors from '../lib/colorlist'

export default {
    props: ['detail', 'visible'],
    data () {
        return {
            colors,
            classInfo: {},
            custom: {}
        }
    },
    async mounted () {
        // 载入个性化设置
        this.loadCustomConfig()
    },
    methods: {
        closeDetail () {
            this.$emit('closer')
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
        isActive (color) {
            if (!this.custom[this.detail]) {
                if (color === '#52596b') {
                    return true
                } else {
                    return false
                }
            } else {
                if (this.custom[this.detail].style) {
                    return color === this.custom[this.detail].style.background
                } else {
                    return false
                }
            }
        },
        changeColor (params) {
            if (!this.custom[this.detail]) {
                this.custom[this.detail] = {
                    style: {
                        background: params.color
                    },
                    classInfo: {}
                }
            } else {
                if (this.custom[this.detail].style) {
                    this.custom[this.detail].style.background = params.color
                } else {
                    this.custom[this.detail].style = {
                        background: params.color
                    }
                }
            }

            // 更新 color picker
            this.colors.reverse().reverse()

            // 应用设置
            this.emitCustomColor(params.color)

            // 关闭详情
            this.closeDetail()
        },
        emitCustomColor (color) {
            this.$emit('newColor', color, this.detail)
        },
        getLocalImage (local) {
            if (/南区N/.test(local)) {
                return 'nq.jpg'
            } else if (/文科楼/.test(local)) {
                return 'wkl.jpg'
            } else {
                return 'none.jpg'
            }
        }
    },
    watch: {
        detail () {
            this.classInfo = JSON.parse(window.localStorage.getItem(this.detail))
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/stylesheet/detail.less';
</style>
