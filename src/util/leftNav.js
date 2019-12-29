const navList = [{
    "iconType": "home",
    "id": 100,
    "label": "首页",
    "level": 1,
    "status": 1,
    "url": "/home"
}, {
    "iconType": "user",
    "id": 200,
    "label": "人物",
    "level": 1,
    "status": 1,
    "url": "/member"
}, {
    "iconType": "fire",
    "id": 300,
    "label": "任务",
    "level": 1,
    "status": 1,
    "url": "/task"
}, {
    "iconType": "pay-circle",
    "id": 400,
    "label": "收/支",
    "level": 1,
    "status": 1,
    "url": "/user"
}, {
    "children": [{
        "iconType": "heart",
        "id": 501,
        "label": "爱好",
        "level": 2,
        "parent_id": "500",
        "status": 1,
        "url": "/hobby"
    }],
    "iconType": "hdd",
    "id": 500,
    "label": "其他",
    "level": 1,
    "status": 1,
    "url": "/other"
}]
// export default navList