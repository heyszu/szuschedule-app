const classSize = {
    type10: {
        height: 100
    },
    type12: {
        height: 100
    },
    type20: {
        height: 100
    },
    type30: {
        height: 100
    },
    type40: {
        height: 100
    },
    type47: {
        height: 100
    },
    type50: {
        height: 100
    },
    type60: {
        height: 100
    },
    type11: {
        height: 152
    },
    type15: {
        height: 152
    },
    type31: {
        height: 152
    },
    type35: {
        height: 152
    },
    type53: {
        height: 152
    },
    type56: {
        height: 152
    },
    type21: {
        height: 204
    },
    type25: {
        height: 204
    },
    type41: {
        height: 204
    },
    type44: {
        height: 204
    }
}

export default Object.assign({
    mainView: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        paddingTop: 32,
        height: 72,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 18,
        color: '#444'
    },
    schedule: {
        flex: 1,
        flexDirection: 'row',
        padding: 4,
        paddingTop: 0
    },
    weekDay: {
        flex: 1
    },
    firstCol: {
        width: 40
    },
    class: {
        margin: 2,
        height: 48,
        padding: 5,
        borderRadius: 3,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    head: {
        height: 32,
        opacity: .5,
        backgroundColor: 'rgba(94, 142, 214, .1)'
    },
    title: {
        opacity: .5,
        backgroundColor: 'rgba(94, 142, 214, 0.1)'
    },
    normalClass: {
        backgroundColor: '#52596b'
    },
    empty: {
        backgroundColor: 'rgba(94, 142, 214, 0.05)'
    },
    classText: {
        fontSize: 12,
        lineHeight: 16,
        color: '#FFF',
        textAlign: 'center'
    }
}, classSize)
