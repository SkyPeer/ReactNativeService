module.exports = async (taskData) => {
    // console.log('Background task', taskData)
    global.interval = setInterval(console.log, 5000, 'I am set Interval js task');
};