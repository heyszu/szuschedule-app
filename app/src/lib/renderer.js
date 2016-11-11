import allSo from './so'
import _ from 'utility'

const container = () => {
    return Array(5).fill([]).map(() => {
        return Array(12).fill({}).map(() => {
            return {
                _id: '',
                visible: true,
                length: 0,
                empty: true,
                classInfo: {}
            }
        })
    })
}

/**
 * 修剪课程表树
 * @param  {[Object]} s [课程表]
 * @return {[type]}   [description]
 */
const trimSchedule = s => {
    return Object.keys(s).map(i => {
        return s[i].map(dayItem => {
            const _id = '_' + _.md5(dayItem.id + dayItem.course_name + dayItem.class_location + dayItem.section_order + dayItem.odd_even_week).substr(0, 7)
            window.localStorage.setItem(_id, JSON.stringify(dayItem))
            return {
                _id,
                so: dayItem.section_order
            }
        })
    })
}

/**
 * 生成渲染树
 * @param  {[Object]} schedule [课程表]
 * @param  {[Number]} odd      [单双周]
 * @return {[Object]}
 */
module.exports = (schedule, odd) => {
    const newSchedule = container()
    const trimedSchedule = trimSchedule(schedule)

    trimedSchedule.forEach((dayItem, i) => {
        dayItem.forEach(c => {
            const currentSo = allSo[c.so]
            const currentClass = JSON.parse(window.localStorage.getItem(c._id))

            // Location Filter
            currentClass.class_location = currentClass.class_location.replace('实验(学院自行安排实验室)', '实验室')

            if (currentClass.odd_even_week === 3 || currentClass.odd_even_week === odd) {
                newSchedule[i][currentSo.offset]._id = c._id
                newSchedule[i][currentSo.offset].length = currentSo.len
                newSchedule[i][currentSo.offset].empty = false
                newSchedule[i][currentSo.offset].classInfo = currentClass

                for (let j = 1; j < currentSo.len; j++) {
                    newSchedule[i][currentSo.offset + j].visible = false
                }
            }
        })
    })

    return newSchedule
}
