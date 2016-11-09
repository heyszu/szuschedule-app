<template>
    <header>
        <div class="padding"></div>
        <div class="header">
            <div class="leftBtn">
                单周 <i class="material-icons">arrow_drop_down</i>
            </div>
            <div class="rightBtn">
                <i class="material-icons">more_vert</i>
            </div>
        </div>
    </header>
</template>

<style lang="less" scoped>
* {
    display: flex;
}

header {
    width: 100%;
    height: 76px;

    color: #333;

    flex-direction: column;

    div {
        padding: 10px;

        align-items: center;
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
