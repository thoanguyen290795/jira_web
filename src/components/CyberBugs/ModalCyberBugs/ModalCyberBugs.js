import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_ASSINGEES, CHANGE_TASK_MODAL, GET_ALL_PRIORITY_LIST_SAGA, GET_ALL_STATUS_SAGA, GET_ALL_TYPE_TASK_SAGA } from '../../../redux/constants/Cyberbugs/Cyberbugs';
import ReactHtmlParser from "react-html-parser";
import { Editor } from '@tinymce/tinymce-react'; 
import { Select } from 'antd';

export default function ModalCyberBugs() {
    const { taskDetailModal } = useSelector(state => state.TaskReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const {projectDetail} = useSelector(state => state.ProjectReducer); 
    const [historyContent, setHistoryContent] = useState(taskDetailModal.description);
    const [content, setContent] = useState(taskDetailModal.description);
    const [visibleEditor, setVisibleEditor] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_ALL_STATUS_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_LIST_SAGA });
        dispatch({ type: GET_ALL_TYPE_TASK_SAGA}); 
    }, [])
    const renderDescription = () => {
        const jsxDescription = ReactHtmlParser(taskDetailModal.description);
        return <div> 
        {visibleEditor ? <div>
            <Editor
                    name="description"
            
                    initialValue = {taskDetailModal.description}
                    init={{
                        selector: 'textarea#myTextArea',
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={(content, editor) => {
                            setContent(content)
                        }}
                />
                <button className="btn btn-primary" onClick = {()=>{
                     dispatch({
                        type : CHANGE_TASK_MODAL, 
                        name : "description", 
                        value : content
                    })
                    setVisibleEditor(false)
                }}
                >Save</button>
                <button className="btn btn-success" onClick = {()=>{
                    setHistoryContent(historyContent)
                    setVisibleEditor(false)
              
                }}>Close</button>
        </div> 
        :  <div onClick={()=> {
            setHistoryContent(taskDetailModal.description)
            setVisibleEditor(!visibleEditor)}}
            >{jsxDescription}</div>  }
        </div>;
    }
    const handleChange = (e) => {
        const {name, value} = e.target; 
        dispatch({
            type : CHANGE_TASK_MODAL,
            name, 
            value
        })
    }

    const renderTimeTracking = () => {

        const {timeTrackingSpent,timeTrackingRemaining} = taskDetailModal;
        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Math.round( Number(timeTrackingSpent)/max * 100 );

        return <div>
        <div style={{ display: 'flex' }}>
            <i className="fa fa-clock" />
            <div style={{ width: '100%' }}>

                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
                    <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
                </div>
            </div>
            </div>
            <div style={{ width: '100%' }}>

<div className="row"> 
<div className="col-6">
<input type="text" className="form-control" name ="timeTrackingSpent" onChange = {handleChange}/>
</div>
<div className="col-6">
  <input type="text" className="form-control" name ="timeTrackingRemaining" onChange = {handleChange}/>
</div>
</div>
        </div>
        </div>
    }
    console.log(taskDetailModal);
    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
                <div className="modal-dialog modal-info">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="task-title">
                                <i className="fa fa-bookmark" />
                                <select name="typeId" value = {taskDetailModal.typeId} onChange={handleChange}>
                                    {arrTaskType?.map((type, index) => {
                                        return <option key={index} value = {type.id}> {type.taskType}</option>
                                    })}
                                </select>
                                <span>{taskDetailModal.taskName}</span>
                            </div>
                            <div style={{ display: 'flex' }} className="task-click">
                                <div>
                                    <i className="fab fa-telegram-plane" />
                                    <span style={{ paddingRight: 20 }}>Give feedback</span>
                                </div>
                                <div>
                                    <i className="fa fa-link" />
                                    <span style={{ paddingRight: 20 }}>Copy link</span>
                                </div>
                                <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-8">
                                        <p className="issue">This is an issue of type: Task.</p>
                                        <div className="description">
                                            <p>Description</p>
                                            {renderDescription()}
                                        </div>
                                        <div style={{ fontWeight: 500, marginBottom: 10 }}>
                                            Jira Software (software projects) issue types:
              </div>
                                        <div className="title">
                                            <div className="title-item">
                                                <h3>BUG <i className="fa fa-bug" /></h3>
                                                <p>
                                                    A bug is a problem which impairs or prevents the
                                                    function of a product.
                  </p>
                                            </div>
                                            <div className="title-item">
                                                <h3>STORY <i className="fa fa-book-reader" /></h3>
                                                <p>
                                                    A user story is the smallest unit of work that needs to
                                                    be done.
                  </p>
                                            </div>
                                            <div className="title-item">
                                                <h3>TASK <i className="fa fa-tasks" /></h3>
                                                <p>A task represents work that needs to be done</p>
                                            </div>
                                        </div>
                                        <div className="comment">
                                            <h6>Comment</h6>
                                            <div className="block-comment" style={{ display: 'flex' }}>
                                                <div className="avatar">
                                                    <img src={require("../../../assets/img/download (1).jfif")} alt="hinhAnh" />
                                                </div>
                                                <div className="input-comment">
                                                    <input type="text" placeholder="Add a comment ..." />
                                                    <span>
                                                        <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                        <span>press
                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                        to comment</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="lastest-comment">
                                                <div className="comment-item">
                                                    <div className="display-comment" style={{ display: 'flex' }}>
                                                        <div className="avatar">
                                                            <img src={require("../../../assets/img/download (1).jfif")} alt="hinhAnh" />
                                                        </div>
                                                        <div>
                                                            <p style={{ marginBottom: 5 }}>
                                                                Lord Gaben <span>a month ago</span>
                                                            </p>
                                                            <p style={{ marginBottom: 5 }}>
                                                                Lorem ipsum dolor sit amet, consectetur
                                                                adipisicing elit. Repellendus tempora ex
                                                                voluptatum saepe ab officiis alias totam ad
                                                                accusamus molestiae?
                        </p>
                                                            <div>
                                                                <span style={{ color: '#929398' }}>Edit</span>
                          •
                          <span style={{ color: '#929398' }}>Delete</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="status">
                                            <h6>STATUS</h6>
                                            <select name = "statusId" className="custom-select" onChange = {(e)=>{                                            
                                                // dispatch({
                                                //     type: "UPDATE_TASK_STATUS_SAGA", 
                                                //     taskStatusUpdate : {
                                                //         taskId : taskDetailModal.taskId, 
                                                //         statusId : e.target.value,
                                                //         id :  taskDetailModal.projectId //projectId
                                                //     }
                                                // })                     
                                            }}>
                                            {arrStatus.map((status, index) => {
                    return <option value={status.statusId} key={index}>{status.statusName}</option>})}
                                            </select>
                                        </div>
                                        <div className="assignees">
                                            <h6>ASSIGNEES</h6>
                                            <div>
                                            {
                                                taskDetailModal.assigness.map((user, index) => {
                                                    return <div key={index} style={{ display: 'flex' }} className="item">
                                                        <div className="avatar">
                                                            <img src={user.avatar} alt={user.avatar} />
                                                        </div>
                                                        <p className="name mt-1 ml-1">
                                                            {user.name}
                                                            <i className="fa fa-times" style={{ marginLeft: 5, cursor: "pointer" }}
                                                            onClick = {()=>{
                                                                dispatch({
                                                                    type : "REMOVE_USER_ASSIGN",
                                                                    userId : user.id
                                                                })
                                                            }} />
                                                        </p>
                                                    </div>
                                                })
                                            }
                                                <div className="col-12 mt-2 mb-2">
                                                 
                                                    <Select name="lstUser" className="form-control"
                                                    value = "Add more"
                                                    options =  {projectDetail.members?.filter(mem => {
                                                            let index = taskDetailModal.assigness?.findIndex(us => us.id === mem.userId); 
                                                            if(index !== -1) {
                                                                return false; 
                                                            } 
                                                            return true
                                                        })?.map((mem, index) => {
                                                            return {value : mem.userId, label : mem.name}                                                 })}
                                                    optionFilterProp = "label"
                                                    style = {{width: "100%"}}
                                                    onSelect = {(value) => {
                                                        if(value !== 0) {
                                                           
                                                        let userSelect = projectDetail.members.find(mem => mem.userId == value); 
                                                        userSelect = {...userSelect, id: userSelect.userId}
                                                        //dispatchReducer
                                                        dispatch({
                                                            type: CHANGE_ASSINGEES,
                                                            userSelect
                                                        }) 
                                                        } else {
                                                            return;  
                                                        }
                                                        
                                                    }} >
                                                   
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="reporter">
                                            <h6>REPORTER</h6>
                                            <div style={{ display: 'flex' }} className="item">
                                                <div className="avatar">
                                                    <img src={require("../../../assets/img/download (1).jfif")} alt="hinhAnh" />
                                                </div>
                                                <p className="name">
                                                    Pickle Rick
                    <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="priority" name = "priorityId" style={{ marginBottom: 20 }}>
                                            <h6>PRIORITY</h6>
                                            <select>
                                            {arrPriority.map((item, index) => {
                                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                                            })}
                                            </select>
                                        </div>
                                        <div className="estimate">
                                            <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                            <input type="text" name = "originalEstimate" className="estimate-hours" value={taskDetailModal.originalEstimate}
                                        onChange = {handleChange} />
                                        </div>
                                        <div className="time-tracking">
                                            <h6>TIME TRACKING</h6>
                                            {
                                            renderTimeTracking()
                                        }
                                        </div>
                                        <div style={{ color: '#929398' }}>Create at a month ago</div>
                                        <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
