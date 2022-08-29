// context / reducer / useImperativeHandle后续需要再补

export interface FuncParams {
	name: string;
  type: string;
}

export interface XHooks {
	hooksName: string;
  params: any[];
  result: any
}  

export interface XState {
	stateName: string;
  type: string;
  default: any;
}

export interface XRef {
	refName: string;
  type: string;
  default: any
}

export interface XCallback {
	funcName: string;
  funcContent: string;
  // 用于格式化函数参数类型定义，没有则不处理
  params?: FuncParams[];
  deps: string[];
  async: boolean;
}

export interface XMemo {
	memoName: string;
  funcContent: string;
  deps: string[];
}

export interface XEffect {
	funcContent: string;
  deps: string[];
}

export interface XLayoutEffect {
	funcContent: string;
  deps: string[];
}

/**
 * 搭建组件容器
 */
export interface Container {
  XState: XState[];
  XRef: XRef[];
  XMemo: XMemo[];
  XEffect: XEffect[];
  XLayoutEffect: XLayoutEffect[];
  XCallback: XCallback[];
  XReturn: Component[];
}

export interface Component {
  // 定义物料配置时生成
  type: 'npm' | 'inner';
  // 组件包描述
  package: {
    // import 的包名
    name: string;
    // 比如：1.2.0，version 报warning，非error，仅npm类型需要
    version: string, 
  };
  // 组件构建数据
	data: {
    // 代码中组件名
  	name: string;
    // 组件props
    props: {
      name: string;
      value: string;
      valueType: 'string' | 'other'
    }[];
    children: Component[]
  };
  // 引入组件同时引入的其他代码依赖
  deps: any[];
}