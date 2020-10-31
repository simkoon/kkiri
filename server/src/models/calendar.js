import mongoose, { Schema } from "mongoose";
import schedules from "../api/schedules";

const CalendarSchema = new Schema({
  // 커플 연결 성공시 주어지는 코드 - 채팅방룸id 캘린더 앨범 아이디로 사용
  coupleShareCode: {
    type: Number,
  },
  // 주인들_id
  owner: {
    type: Array,
  },
  calendarData: {
    calendars: {
      type: Array,
      default: [
        {
          id: 0,
          name: "기념일",
          color: "#ffffff",
          bgColor: "#ff838d",
          dragBgColor: "#ff838d",
          borderColor: "#ff838d",
        },
        {
          id: 1,
          name: "데이트",
          color: "#ffffff",
          bgColor: "#00a9ff",
          dragBgColor: "#00a9ff",
          borderColor: "#00a9ff",
        },
      ],
    },
    schedules: {
      type: Array,
      default: [
        {
          id: 0,
          calendarId: 1,
          category: "allDay",
          isVisible: true,
          title: "끼리 첫 시작!",
          body: "우리, 끼리 시작한날",
          start: Date.now(),
          end: Date.now(),
        },
      ],
    },
    dDay: {
      type: Array,
      default: [{}],
    },
  },
});

CalendarSchema.statics.findByCoupleShareCode = async function (
  coupleShareCode
) {
  return await this.findOne({ coupleShareCode });
};

CalendarSchema.methods.changeCalendars = async function (newCalendars) {
  this.calendarData.calendars = newCalendars;
};

// schedules methods
CalendarSchema.methods.createSchedules = async function (newSchedule) {
  // console.log(Array.isArray(this.calendarData.schedules));
  await this.calendarData.schedules.push(newSchedule);
};

// common methods
/**
 * calendarData("calendars", "schedules", "dDay") 에서 targetId로 찾은 값을 modifiedData로 삭제하고 그 결과를 반환함
 *
 * @method deleteCalendarDataByTargetId
 * @param {String} calendarData 수정하고싶은 calendarData 프로퍼티명
 * @param {Number} targetId 수정하고싶은 대상 id값
 * @return {Object} 해당 요소를 삭제한 배열(결과)
 */
CalendarSchema.methods.deleteCalendarDataByTargetId = async function (
  calendarData,
  targetId
) {
  this.calendarData[calendarData] = await this.calendarData[
    calendarData
  ].filter((item) => item.id !== targetId);
  return this.calendarData[calendarData];
};

/**
 * calendarData("calendars", "schedules", "dDay") 에서 targetId로 찾은 값을 modifiedData로 수정하고 그 결과를 반환함
 *
 * @method modifyCalendarDataByTargetId
 * @param {String} calendarData 수정할 대상 문자열 ("calendars", "schedules", "dDay")
 * @param {Number} targetId 찾고자 하는 대상 id값, 반드시 정수여야 함
 * @param {Object} modifiedData 수정한 내용, 반드시 객체형식이여야 함
 * @return {Object} 수정된 내용까지 담은 수정할 대상("calendars", "schedules", "dDay") 배열을 반환함
 */
CalendarSchema.methods.modifyCalendarDataByTargetId = async function (
  calendarData,
  targetId,
  modifiedData
) {
  this.calendarData[calendarData] = await this.calendarData[
    calendarData
  ].map((item) => (item.id === targetId ? modifiedData : item));
  return this.calendarData[calendarData];
};

const Calendar = mongoose.model("Calendar", CalendarSchema);

export default Calendar;
