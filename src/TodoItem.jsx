import React, {Fragment, useState} from 'react';
import style from './style.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Detail from './Detail';
import {Link} from "react-router-dom";

const TodoItem = ({todoitem, onUpdate, onDelete, history}) => {
	let [form, setForm] = useState(todoitem);
	
	const onChange = (event) => {
		setForm({
			...form,
			[event.target.name]: event.target.value
		});
	}
	let [clk, setClk] = useState(true);
	const onOff = (event) => {
		/* #설명01 - event가 왜 undefined
		1) onOff 함수는 수정 버튼을 누를 때 호출하므로, 수정 버튼을 누를 때
		부모까지 이벤트가 전달되게 하지 않기 위해서 stop, prevent를 걸어주신건 잘하셨으나
		
		2) onOff를 클릭했을 때만 호출하는게 아닌 수정요청을 보내고 나서 clk 상태를 바꿔주기 호출하는 용도로도 쓰임(주석 "# 참고01")
		 */
		if (event) {
			event.stopPropagation();
			event.preventDefault();
		}
		
		setClk(!clk);
	}
	const update = (event) => {
		onUpdate(todoitem, form);
		
		// #참고01, 여기선 클릭 이벤트가 일어나서 onOff 함수를 호출하는게 아니기때문에 event 인자가 전달이 안됨, 그래서 onOff가 event가 undefined라고 뜸
		onOff(event);
	}
	
	const moveToDetail = () => {
		/* !주의사항
		* Todo 컴포넌트는 Route를 통해 호출된 컴포넌트이기때문에 props로 history를 전달받음.
		*  하지만 TodoItem은 Route를 통해 호출된게 아니라 Todo가 호출했기때문에 Todo가 history를 전달받아
		*  자식인 TodoItem에게 넘겨줘야함.
		*  하지만 지금 Todo 자체도 Route를 통해 불러오고 있지 않음 그래서 history가 undefined가 뜨고 있음
		*  리액트 라우터 문서를 보고 라우터 세팅을 마치고 나면 이 방법을 사용할 수 있음.
		*  링크 : https://ssa4141.tistory.com/15?category=827420
		* */
		history.push("/Detail");
	};
	
	return (
		
		<div className="Todo">
			{clk ?
				     <BrowserRouter>
					 <Switch>
			    <Link to={"/Detail"}>
					<div>
						{todoitem.title}
						<br/>
						{todoitem.body}
						{todoitem.finishedAt}
						<br/>
						<button onClick={onOff}>수정</button>
						<button onClick={() => {
							onDelete(todoitem)
						}}>삭제
						</button>
					</div>
				</Link>
				<Route exact path="/Detail" component={Detail} />
     </Switch>
     </BrowserRouter>
				// #설명02 - Link 쓰는게 싫은데 다른 방법 있나요? (다른 방법으로 아래 방법이 있지만 굳이 함수를 더 만들어야하기 때문에 정신건강에 좋지 않음, Link 권장)
				/*<div onClick={moveToDetail}>
					<div>
						{todoitem.title}
						<br/>
						{todoitem.body}
						{todoitem.finishedAt}
						<br/>
						<button onClick={onOff}>수정</button>
						<button onClick={() => {
							onDelete(todoitem)
						}}>삭제
						</button>
					</div>
				</div>
				*/
				:
				<Fragment>
					<input name="title" value={form.title} onChange={onChange}></input>
					<br/>
					<input name="body" value={form.body} onChange={onChange}></input>
					<br/>
					<input name="finishedAt" value={form.finishedAt} onChange={onChange}></input>
					<br/>
					<br/>
					<button onClick={update}>확인</button>
				</Fragment>}
		</div>
	);
}
export default (TodoItem);