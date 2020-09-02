---
sidebarDepth: 2
title: Grid 布局
---

# Grid 布局

## Grid 布局和 flex 布局

讲到布局，我们就会想到 `flex` 布局，甚至有人认为竟然有 `flex` 布局了，似乎没有必要去了解 `Grid` 布局。但 `flex` 布局和 `Grid` 布局有实质的区别，那就是 `flex` 布局是一维布局，`Grid` 布局是二维布局。`flex` 布局一次只能处理一个维度上的元素布局，一行或者一列。`Grid` 布局是将容器划分成了行和列，产生了一个个的网格，我们可以将网格元素放在与这些行和列相关的位置上，从而达到我们布局的目的。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/393769/1598509376900-29d3003d-6584-4241-bbf2-31e8eb353969.png#align=left&display=inline&height=307&margin=%5Bobject%20Object%5D&name=image.png&originHeight=307&originWidth=624&size=17208&status=done&style=none&width=624)

## Grid 的一些基础概念

```html
<div class="wrapper">
  <div class="one item">One</div>
  <div class="two item">Two</div>
  <div class="three item">Three</div>
  <div class="four item">Four</div>
  <div class="five item">Five</div>
  <div class="six item">Six</div>
</div>
```

```css
.wrapper {
  margin: 60px;
  /* 声明一个容器 */
  display: grid;
  /*  声明列的宽度  */
  grid-template-columns: repeat(3, 200px);
  /*  声明行间距和列间距  */
  grid-gap: 20px;
  /*  声明行的高度  */
  grid-template-rows: 100px 200px;
}

.item {
  text-align: center;
  font-size: 200%;
  color: #fff;
}
```

![image.png](https://cdn.nlark.com/yuque/0/2020/png/393769/1598509530529-721bc95a-cd1c-495d-9d30-a0b5ce75266a.png#align=left&display=inline&height=334&margin=%5Bobject%20Object%5D&name=image.png&originHeight=334&originWidth=632&size=52617&status=done&style=none&width=632)

容器和项目：我们通过在元素上声明 `display：grid` 或 `display：inline-grid` 来创建一个网格容器。一旦我们这样做，这个元素的所有直系子元素将成为网格项目。比如上面 `.wrapper` 所在的元素为一个网格容器，其直系子元素将成为网格项目。
网格轨道：`grid-template-columns` 和 `grid-template-rows` 属性来定义网格中的行和列。容器内部的水平区域称为行，垂直区域称为列。上图中 `One`、`Two`、`Three` 组成了一行，`One`、`Four` 则是一列。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/393769/1598509627730-9b474e4e-b6c1-4ba3-ac00-80f7d31222b9.png#align=left&display=inline&height=368&margin=%5Bobject%20Object%5D&name=image.png&originHeight=368&originWidth=672&size=153637&status=done&style=none&width=672)

网格单元：一个网格单元是在一个网格元素中最小的单位， 从概念上来讲其实它和表格的一个单元格很像。上图中 `One`、`Two`、`Three`、`Four`...都是一个个的网格单元
网格线：划分网格的线，称为"网格线"。应该注意的是，当我们定义网格时，我们定义的是网格轨道，而不是网格线。Grid 会为我们创建编号的网格线来让我们来定位每一个网格元素。m 列有 m + 1 根垂直的网格线，n 行有 n + 1 跟水平网格线。比如上图示例中就有 4 根垂直网格线。一般而言，是从左到右，从上到下，1，2，3 进行编号排序。当然也可以从右到左，从下到上，按照 -1，-2，-3...顺序进行编号排序。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/393769/1598509756684-e59a2793-9433-4fa3-9516-0352711768dc.png#align=left&display=inline&height=406&margin=%5Bobject%20Object%5D&name=image.png&originHeight=406&originWidth=678&size=136670&status=done&style=none&width=678)

## 容器属性

### display

我们通过在元素上声明  `display：grid`  或  `display：inline-grid`  来创建一个网格容器。声明  `display：grid`  则该容器是一个块级元素，设置成  `display: inline-grid`  则容器元素为行内元素。

```css
.wrapper {
  display: grid;
}
```

![image.png](https://cdn.nlark.com/yuque/0/2020/png/393769/1598510370923-76f3c29a-9f48-409d-98d4-8f60305cc06c.png#align=left&display=inline&height=196&margin=%5Bobject%20Object%5D&name=image.png&originHeight=196&originWidth=672&size=50588&status=done&style=none&width=672)

```css
.wrapper {
  display: inline-grid;
}
```

![](https://cdn.nlark.com/yuque/0/2020/webp/393769/1598510390031-55fe77bb-e107-4403-9387-a7cfe5408d8d.webp#align=left&display=inline&height=219&margin=%5Bobject%20Object%5D&originHeight=219&originWidth=1240&size=0&status=done&style=none&width=1240)

### grid-template-columns
