<template>
    <header>
        <div class="padding" v-if="!isAndroid"></div>
        <div class="header">
            <div class="leftBtn" @touchstart="switchSingleWeek">
                {{ (weekOdd === 2) ? '双周' : '单周' }} <i class="material-icons">arrow_drop_down</i>
            </div>
            <div class="rightBtn">
                <i class="material-icons" @touchstart="toggleMenu">more_vert</i>
                <div class="menu" :class="{ menuOpen: menuVisible }">
                    <li @touchstart="logout">退出账号</li>
                    <li @touchstart="about">关于</li>
                </div>
            </div>
        </div>
        <div class="mask" v-show="menuVisible" @touchstart="toggleMenu"></div>
    </header>
</template>

<script>
export default {
    props: ['weekOdd'],
    data () {
        return {
            isAndroid: false,
            menuVisible: false
        }
    },
    created () {
        document.addEventListener('deviceready', () => {
            if (window.device) {
                console.log(window.device)
                console.log(window.device.platform)
                if (window.device.platform === 'Android') {
                    this.isAndroid = true
                }
            }
        }, false)
    },
    methods: {
        switchSingleWeek () {
            this.$emit('switchSingleWeek')
        },
        toggleMenu () {
            this.menuVisible = !this.menuVisible
        },
        logout () {
            this.toggleMenu()
            window.localStorage.removeItem('isPreLogin')
            window.localStorage.removeItem('isLogin')
            window.location.reload()
        },
        about () {
            this.toggleMenu()
            navigator.notification.alert(`深大课表是由“这很深大”公众号团队开发的一款课表查询软件，仅供深大学生使用。\n版本号: v1.0\n作者: Jason <jason@iszu.cn>`, function () {}, '关于深大课表', '知道了')
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/stylesheet/header.less';
</style>
