

// 无状态函数组件
declare namespace JSX {
  interface Element { }
}

interface MyCompProps {
  className: string
  X: number
  Y: number
}

function MyComp(props: MyCompProps): any {
  return <div className={props.className}>{props.Y}, {props.Y}</div>
}

let myComp = <MyComp className="class1" X={1} Y={2}></MyComp>



// 函数重载
function Welcome(props: { content: JSX.Element[] | JSX.Element }): JSX.Element;
function Welcome(props: { name: string }): JSX.Element;
function Welcome(props: any) {
  if(props.name) {
    return <h1>Hello, {props.name}</h1>;
  }else if(props.content){
    return props.content
  }
}

<div>
  <Welcome name="Lily" />
  <Welcome content={<span>Hello</span>} />
</div>