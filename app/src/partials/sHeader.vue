<template>
    <header>
        <div class="padding" v-if="!isAndroid"></div>
        <div class="header">
            <div class="leftBtn" v-tap="{ methods: switchSingleWeek }">
                {{ (weekOdd === 2) ? '双周' : '单周' }} <i class="material-icons">arrow_drop_down</i>
            </div>
            <div class="rightBtn">
                <i class="material-icons">more_vert</i>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    props: ['weekOdd'],
    data () {
        return {
            isAndroid: false
        }
    },
    mouted () {
        const android = setInterval(() => {
            /*
            if (window.device) {
                if (window.device.platform === 'Android') {
                    this.isAndroid = true
                }
                clearInterval(android)
            }
            */
            clearInterval(android)
        }, 15)
    },
    methods: {
        switchSingleWeek () {
            this.$emit('switchSingleWeek')
        }
    }
}
</script>

<style lang="less" scoped>
* {
    display: flex;
}

header {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 76px;

    background: #FFF;

    color: #333;

    flex-direction: column;

    z-index: 100;

    div {
        padding: 10px;

        align-items: center;

        background: #FFF;
    }

    .leftBtn {
        width: 60%;
        padding-left: 20px;

        font-size: 16px;

        .material-icons {
            font-size: 24px;
        }
    }

    .rightBtn {
        width: 40%;
        padding-right: 20px;

        justify-content: flex-end;

        .material-icons {
            font-size: 24px;
        }
    }
}
</style>
