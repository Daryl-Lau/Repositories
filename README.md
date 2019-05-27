# wrap-tabbar
移动端顶部滑动导航栏

## 安装
```
npm install 
```

## 使用
#### 1.编辑main.js，引入wrap-tabbar
```javascript
import wtb from './components/wrapTabBar'

Vue.use(wtb);
```

#### 2.组件中使用wrap-tabbar
```javascript
<template>
    <wtb
        :tabList="tabList"
        :tabBarStyle="tabBarStyle"
        :listItemStyle="listItemStyle"
        :moveTagStyle="moveTagStyle"
        :dragWhiteSpace="dragWhiteSpace"
        :activeFontColor="activeFontColor"
        :noActiveFontColor="noActiveFontColor"
        @change="change"
    ></wtb>
</template>

<script>
export default {
    data() {
        return {
            tabList: [
                {title: 'DataBase', isActive: true},
                {title: 'Oracle', isActive: false},
                {title: 'MySQL', isActive: false},
                {title: 'MongoDB', isActive: false},
                {title: 'Redis', isActive: false},
                {title: 'Linux', isActive: false},
                {title: 'shell', isActive: false},
                {title: 'bash', isActive: false},
                {title: '网络', isActive: false},
                {title: 'HCIE', isActive: false},
                {title: 'Cisco', isActive: false},
                {title: 'Python', isActive: false},
                {title: 'RedHat', isActive: false},
                {title: 'CentOS', isActive: false},
                {title: 'Docker', isActive: false},
            ],
            tabBarStyle: {backgroundColor: ''},
            listItemStyle: {width: 70, height: 50, fontSize: 12, fontColor: '#6c6c6c'},
            moveTagStyle: {display: true, width: 30, height: 2, offsetBottom: 5, color: 'skyblue'},
            dragWhiteSpace: 100,
            activeFontColor: {color: 'skyblue'},
            noActiveFontColor: {color: '#6c6c6c'}
        }
    },
}
</script>
```

## 参数说明：
```text
导航栏内容，title指定选项，可修改，isActive指定是否选中，无需修改
tabList: [
    {title: 'DataBase', isActive: true},
    ...
]
```

```text
导航栏的背景颜色配置

tabBarStyle: {backgroundColor: ''},
```

```text
每个选项的样式配置，分别为宽、高、字体大小、字体颜色
!!!注意：这里的宽高直接决定了整个导航栏的宽高

listItemStyle: {width: 70, height: 50, fontSize: 12, fontColor: '#6c6c6c'},
```

```text
移动游标的样式配置，分别为是否隐藏、宽、高、距离导航栏底部的高度、背景颜色

moveTagStyle: {display: true, width: 30, height: 2, offsetBottom: 5, color: 'skyblue'},
```

```text
导航栏拖动边界时拉伸的宽度

dragWhiteSpace: 100,
```

```text
选中颜色和非选中颜色

activeFontColor: {color: 'skyblue'},
            noActiveFontColor: {color: '#6c6c6c'}
```

## 暴露的方法
```text
向外暴露了change方法，当切换选项时，返回该选项的index

<wtb @change="change"></wtb>

methods: {
    change(index){
         console.log(index);
    }
}
```