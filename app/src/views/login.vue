<template>
    <div id="loginPage">
        <div class="icon">
            <img src="../assets/img/icon.png" height="80">
        </div>
        <h3>快速开始</h3>
        <p class="tips">只需填写学号姓名，数据仅在本地储存</p>
        <div class="form">
            <input type="text" placeholder="10位学号" v-model="stuInfo.stu_no">
            <input type="text" placeholder="姓名" v-model="stuInfo.stu_name">
            <button @click="getSchedule">立 即 使 用</button>
        </div>
    </div>
</template>

<script>
import http from 'axios'
import config from '../config'

export default {
    data () {
        return {
            stuInfo: {
                stu_no: '',
                stu_name: ''
            }
        }
    },
    mounted () {
        if (this.$store.state.isLogin || this.$store.state.isPreLogin) {
            this.$router.push({ name: 'index' })
            return
        }
    },
    methods: {
        async getSchedule () {
            if (!this.stuInfo.stu_no) {
                navigator.notification.alert('请输入学号！', function () {}, '阿偶', '好吧...')
                return
            }
            if (!this.stuInfo.stu_no) {
                navigator.notification.alert('请输入姓名！', function () {}, '阿偶', '好吧...')
                return
            }
            if (isNaN(parseInt(this.stuInfo.stu_no)) || this.stuInfo.stu_no.length !== 10) {
                navigator.notification.alert('请输入正确的学号！', function () {}, '阿偶', '好吧...')
                return
            }

            try {
                const res = await http.post(config.api + '/scheduleprelogin', {
                    stu_no: this.stuInfo.stu_no,
                    stu_name: this.stuInfo.stu_name
                })

                if (res.data.status === 200) {
                    // Save login data
                    window.localStorage.setItem('schedule', JSON.stringify(res.data.data.schedule))
                    window.localStorage.setItem('preLoginState', JSON.stringify({
                        stu_no: this.stuInfo.stu_no,
                        stu_name: this.stuInfo.stu_name
                    }))
                    window.localStorage.setItem('isPreLogin', true)

                    this.$store.dispatch('updatePreLoginState', {
                        isPreLogin: true,
                        preLoginState: {
                            stu_no: this.stuInfo.stu_no,
                            stu_name: this.stuInfo.stu_name
                        },
                        schedule: res.data.data.schedule
                    })

                    // Jump to index
                    this.$router.push({ name: 'index' })
                } else if (res.data.status === 201) {
                    navigator.notification.alert('学号和姓名不匹配！', function () {}, '阿偶', '好吧...')
                } else {
                    navigator.notification.alert('未知错误', function () {}, '阿偶', '好吧...')
                }
            } catch (error) {
                console.log(error)
                navigator.notification.alert('网络无连接或服务器错误，请稍后重试。', error => {
                    console.log(error)
                }, '网络错误', '好吧...')
            }
        }
    }
}
</script>

<style lang="less" scoped>
#loginPage {
    width: 100%;
    height: 100%;
    color: #444;
    background: #F0F0F0;
    position: absolute;

    .icon {
        margin-top: 40px;
        padding: 20px;
        display: flex;
        justify-content: center;
    }

    h3 {
        margin-top: 5px;
        text-align: center;
        font-size: 24px;
        line-height: 42px;
    }

    .tips {
        color: rgba(34,34,34,.8);
        margin-top: 5px;
        font-size: 12px;
        text-align: center;
    }

    .form {
        margin: 40px auto;
        width: 100%;
        max-width: 320px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        input, button {
            width: 80%;
            height: 50px;
            margin: 0 auto;
            text-align: center;
            font-size: 16px;
            color: #444;
            line-height: 50px;
            border: 1px solid rgba(0,0,0,.1);
            border-top: none;
            border-bottom: none;
            border-radius: 0;
            -webkit-appearance: none;

            &:first-child {
                border-radius: 3px 3px 0 0;
                border: 1px solid rgba(0,0,0,.1);
            }

            &:last-child {
                border-radius: 0 0 3px 3px;
            }
        }

        button {
            color: #FFF;
            font-size: 18px;
            background: #f67d34;
            user-select: none;
            transition: all 200ms;

            &:active {
                background: #b15924;
            }
        }
    }

    .advanced {
        margin-top: 40px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        display: none;

        p {
            color: #FFF;
            margin-bottom: 20px;
            font-size: 12px;
            text-align: center;
            text-shadow: 0 2px 2px rgba(0,0,0,.2);
        }

        .wxLogin {
            width: 70%;
            height: 40px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #FFF;
            border-radius: 25px;
            box-shadow: 0 3px 5px rgba(0,0,0,.1),  0 3px 5px rgba(0,0,0,.1) inset;
            text-shadow: 0 3px 5px rgba(0,0,0,.1);
            opacity: 0.8;
            user-select: none;
            transition: all 200ms;

            svg {
                margin-right: 5px;
            }

            &:active {
                opacity: 1;
            }
        }
    }
}
</style>
