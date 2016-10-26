<template>
    <div class="hello">
        <header>
            <!-- <svg fill="#FFFFFF" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onclick="toggleDrawer()">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg> -->
            <p onclick="toggleDrawer()">深大课表</p>
            <!-- <svg class="searchBtn" fill="#FFFFFF" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg> -->
            <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" @click="showMenu">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <div class="menu" :class="{ menuOpen: menuOpen }">
                <ul>
                    <li @click="showAbout">
                        <svg fill="#444" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                        </svg>
                        <p>关于</p>
                    </li>
                </ul>
            </div>
        </header>
        <div class="maskTransparent" @click="showMenu" v-if="menuOpen"></div>
        <div class="schedule">
            <div class="col col1">
                <div class="class head title"><p>　</p></div>
                <div class="class title"><p>1</p></div>
                <div class="class title"><p>2</p></div>
                <div class="class title"><p>3</p></div>
                <div class="class title"><p>4</p></div>
                <div class="class title"><p>5</p></div>
                <div class="class title"><p>6</p></div>
                <div class="class title"><p>7</p></div>
                <div class="class title"><p>8</p></div>
                <div class="class title"><p>9</p></div>
                <div class="class title"><p>10</p></div>
                <div class="class title"><p>11</p></div>
                <div class="class title"><p>12</p></div>
            </div>
            <div class="col day1" id="day1">
                <div class="class head"><p>一</p></div>
            </div>
            <div class="col day2" id="day2">
                <div class="class head"><p>二</p></div>
            </div>
            <div class="col day3" id="day3">
                <div class="class head"><p>三</p></div>
            </div>
            <div class="col day4" id="day4">
                <div class="class head"><p>四</p></div>
            </div>
            <div class="col day5" id="day5">
                <div class="class head"><p>五</p></div>
            </div>
            <!--
            <div class="col day6">
                <div class="class head"><p>六</p></div>
            </div>
            <div class="col day7">
                <div class="class head"><p>日</p></div>
            </div>
            -->
        </div>
    </div>
</template>

<script>
import timett from '../assets/timeToType'

export default {
    data () {
        return {
            menuOpen: false
        }
    },
    async mounted () {
        if (!this.$store.state.isLogin && !this.$store.state.isPreLogin) {
            this.$router.push('login')
            return
        }
        if (Object.keys(this.$store.state.schedule).length === 0) {
            try {
                await this.$store.dispatch('updateSchedule', this.$store.state.loginState.login_ticket)
                this.renderSchedule()
            } catch (e) {
                console.log(1)
            }
        } else {
            this.renderSchedule()
        }
    },
    methods: {
        callWechatLogin () {
            const scope = 'snsapi_userinfo'
            const state = '_' + (+new Date())
            window.Wechat.auth(scope, state, function (response) {
                navigator.notification.beep(JSON.stringify(response))
            }, function (reason) {
                navigator.notification.beep('拉起微信登陆失败：' + reason)
            })
        },
        renderSchedule () {
            const schedule = this.$store.state.schedule
            // console.log(schedule)
            Object.keys(schedule).forEach(weekDay => {
                let day = document.getElementById('day' + weekDay)
                let today = schedule[weekDay]

                if (today.length === 0) {
                    day.innerHTML = day.innerHTML + this.spaceDom(12)
                } else {
                    let todayCountClass = 0

                    let DOM = today.map((cur, index) => {
                        let time = this.typeToTime(cur.section_order)
                        if ((cur.odd_even_week % 2) !== this.getWeek() && cur.odd_even_week !== 3) {
                            return ''
                        } else {
                            let res = this.spaceDom(time.offset - todayCountClass) + this.classDom(cur.section_order, cur.course_name, cur.class_location, cur.id, weekDay)
                            if (!window.localStorage.getItem(cur.id)) {
                                window.localStorage.setItem(cur.id, JSON.stringify(cur))
                            }
                            todayCountClass += time.offset - todayCountClass + time.len
                            return res
                        }
                    })

                    DOM = DOM.join('')

                    if (todayCountClass !== 12) {
                        DOM += this.spaceDom(12 - todayCountClass)
                    }

                    day.innerHTML = day.innerHTML + DOM
                }
            })

            document.querySelectorAll('.normalClass').forEach(v => v.addEventListener('touchstart', e => {
                this.classHandler(e.currentTarget.dataset.classid)
            }, true))
        },
        classHandler (id) {
            console.log(window.localStorage.getItem(id))
        },
        typeToTime (type) {
            return timett[type]
        },
        spaceDom (offset) {
            let dom = ''
            for (let i = 0; i < offset; i++) {
                dom += '<div class="class normal empty"><p>　</p></div>'
            }
            return dom
        },
        classDom (type, name, location, id, i) {
            return `<div class="class normal normalClass type${type}" data-classid="${id}"><p>${name}<br/>@${location}</p></div>`
        },
        getWeek () {
            let date = new Date()
            let date2 = new Date(date.getFullYear(), 0, 1)
            let today = Math.floor((date - date2) / (24 * 60 * 60 * 1000)) + 1
            return (Math.floor(today / 7) - 35) % 2
        },
        showMenu () {
            this.menuOpen = !this.menuOpen
        },
        showAbout () {
            this.menuOpen = !this.menuOpen
            navigator.notification.alert('深大课表是由“这很深大”公众号团队开发的一款课表查询软件，仅供深大学生使用。\n版本号: v0.1.0 preview\n作者: Jason <jason@iszu.cn>', function () {}, '关于深大课表', '知道了')
        }
    }
}
</script>

<style lang="less" scoped>
header {
    width: 100%;
    height: 60px;
    background: #5e8ed6;
    display: flex;
    justify-content: space-between;
    align-content: center;
    box-shadow: 0 5px 7px rgba(0,0,0,.1);

    svg {
        width: 24px;
        height: 24px;
        margin: auto 14px;
        display: block;
        flex-shrink: 0;
    }

    p {
        width: 100%;
        height: 20px;
        font-size: 20px;
        line-height: 20px;
        margin: auto 0;
        padding-left: 20px;
        color: #FFF;
    }
}
</style>

<style lang="less">
.menu {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 50%;
    background: #FFF;
    z-index: 102;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0,0,0,.3);
    transform-origin: 100% 0;
    transition: all 150ms ease;
    transform: scale(0);

    ul {
        list-style: none;
        display: flex;

        li {
            height: 4.5rem;
            width: 100%;
            color: #444;
            font-size: 1.6rem;
            padding: 0.5rem 1rem;
            text-align: left;
            display: flex;
            flex-direction: row;
            align-items: center;
            transition: all 200ms ease;

            svg {
                margin: 0;
                margin-right: 5px;
                width: 2.4rem;
                height: 2.4rem;
                -ms-flex-negative: 1;
                flex-shrink: 1;
            }

            p {
                font-size: 1.4rem;
                color: #444;
            }

            &:active {
                background: rgba(0,0,0,.1);
            }
        }
    }
}

.menuOpen {
    transform: scale(1);
}

.schedule {
    margin-top: 5px;
    width: 100%;
    padding: 4px;
    display: flex;

    .col {
        width: 100%;
        margin: 1px;
        display: flex;
        flex-direction: column;

        .class {
            width: 100%;
            height: 46px;
            margin: 1px;
            padding: 5px;
            text-align: center;
            background: #FFF;
            border-radius: 2px;
            display: flex;
            align-items: center;
            word-break: break-all;
            overflow: hidden;

            p {
                width: 100%;
                display: block;
            }
        }

        .head {
            height: 32px;
            opacity: .5;
        }

        .title {
            font-weight: bold;
            opacity: .5;
        }

        .normal {
            font-size: 12px;
            line-height: 16px;
            color: #FFF;
            background: #5e8ed6;
        }

        .empty {
            background: rgba(255,255,255,.5);
        }

        .type10, .type12, .type20, .type30, .type40, .type47, .type50, .type60 {
            height: 94px;
        }

        .type11, .type15, .type31, .type35, .type53, .type56 {
            height: 142px;
        }

        .type21, .type25, .type41, .type44 {
            height: 190px;
        }
    }

    .col1 {
        width: 70%;
    }
}

.maskTransparent {
    position: fixed;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 999;
    opacity: 0;
    transition: all 300ms ease;
}

.showMask {
    opacity: 1;
    pointer-events: auto;
}
</style>
