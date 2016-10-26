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
        <div class="advanced">
            <p>若要云端保存课表编辑信息，请登录</p>
            <div class="wxLogin">
                <svg fill="#FFFFFF" width="30" height="20" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="scale(0.02, 0.02)"><path d="M693.12 347.264c11.776 0 23.36 0.896 35.008 2.176-31.36-146.048-187.456-254.528-365.696-254.528C163.2 94.912 0 230.656 0 403.136c0 99.52 54.272 181.248 145.024 244.736L108.8 756.864l126.72-63.488c45.312 8.896 81.664 18.112 126.912 18.112 11.392 0 22.656-0.512 33.792-1.344-7.04-24.256-11.2-49.6-11.2-76.032C385.088 475.776 521.024 347.264 693.12 347.264zM498.304 249.024c27.392 0 45.376 17.984 45.376 45.248 0 27.136-17.984 45.312-45.376 45.312-27.072 0-54.336-18.176-54.336-45.312C443.968 266.944 471.168 249.024 498.304 249.024zM244.672 339.584c-27.2 0-54.592-18.176-54.592-45.312 0-27.264 27.392-45.248 54.592-45.248S289.92 266.944 289.92 294.272C289.92 321.408 271.872 339.584 244.672 339.584zM1024 629.76c0-144.896-145.024-262.976-307.904-262.976-172.48 0-308.224 118.144-308.224 262.976 0 145.28 135.808 262.976 308.224 262.976 36.096 0 72.512-9.024 108.736-18.112l99.392 54.528-27.264-90.624C969.728 783.872 1024 711.488 1024 629.76zM616.128 584.384c-17.984 0-36.224-17.92-36.224-36.224 0-18.048 18.24-36.224 36.224-36.224 27.52 0 45.376 18.176 45.376 36.224C661.504 566.464 643.648 584.384 616.128 584.384zM815.488 584.384c-17.856 0-36.032-17.92-36.032-36.224 0-18.048 18.112-36.224 36.032-36.224 27.264 0 45.376 18.176 45.376 36.224C860.864 566.464 842.752 584.384 815.488 584.384z"></path></g></svg>
                微信登录
            </div>
        </div>
    </div>
</template>

<script>
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
        getSchedule () {
            if (!this.stuInfo.stu_no) {
                navigator.notification.alert('请输入学号！', function () {})
                return
            }
            if (!this.stuInfo.stu_no) {
                navigator.notification.alert('请输入姓名！', function () {})
                return
            }
            if (isNaN(parseInt(this.stuInfo.stu_no)) || this.stuInfo.stu_no.length !== 10) {
                navigator.notification.alert('请输入正确的学号！', function () {})
                return
            }
            this.$http.post(config.api + '/scheduleprelogin', {
                stu_no: this.stuInfo.stu_no,
                stu_name: this.stuInfo.stu_name
            }).then(res => {
                if (res.data.status === 200) {
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
                    this.$router.push({ name: 'index' })
                    return
                } else if (res.data.status === 201) {
                    navigator.notification.alert('学号和姓名不匹配！', function () {})
                } else {
                    navigator.notification.alert('未知错误', function () {})
                }
            }, e => {
                navigator.notification.alert('网络无连接或服务器错误，请稍后重试。', function () {})
            })
        }
    }
}
</script>

<style lang="less" scoped>
#loginPage {
    width: 100%;
    height: 100%;
    color: #FFF;
    background-image: url('../assets/img/bg.jpg');
    background-size: cover;
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
        text-shadow: 0 2px 5px rgba(0,0,0,.2);
    }

    .tips {
        color: rgba(255,255,255,.8);
        margin-top: 5px;
        font-size: 12px;
        text-align: center;
        text-shadow: 0 2px 2px rgba(0,0,0,.2);
    }

    .form {
        margin-top: 20px;
        width: 100%;
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
            box-shadow: 0 4px 10px rgba(0,0,0,.2);

            &:first-child {
                border-radius: 3px 3px 0 0;
                border-bottom: 1px solid rgba(0,0,0,.1);
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
