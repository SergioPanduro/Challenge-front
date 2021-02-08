import React,{useEffect,useState} from 'react'
import Grid from '@material-ui/core/Grid';
// hooks react redux
import {useDispatch, useSelector} from 'react-redux'
import { Table } from 'antd';
// importamos la acción
import {obtenerTodoAction,obtenerTodoFiltro,crearTodo,obtenerTodoInfo,borrarUnTodo,editarTodo,editarCompletedTodo} from '../redux/todos'
import { DatePicker} from 'antd';
import moment from 'moment';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Modal, Drawer, Select } from 'antd';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { useResizeDetector } from 'react-resize-detector';
const { Option } = Select;

const Tables = () => {

    const dispatch = useDispatch()
    const dateFormat = 'DD/MM/YYYY';
    const todo = useSelector(store => store.todos.arrayTodos)
    const unTodo = useSelector(store => store.todos.arrayTodo)
    const [count, setCount] = useState(0);
    const [modal, setModal] = useState(false);
    const [error, setError] = useState('none');
    const [errorEdit, setErrorEdit] = useState('none');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [drawer, setDrawer] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [titleEdit, setTitleEdit] = useState('');
    const [descriptionEdit, setDescriptionEdit] = useState('');
    const [idEdit, setIdEdit] = useState(0);
    const [completedEdit, setCompletedEdit] = useState('');
    const [dateEdit, setDateEdit] = useState('');
    const [widthWindow, setWidthWindow] = useState('');

    const { width, height, ref } = useResizeDetector();

    
    const columns = [
        {
            title: '',
            key: 'Completed',
            render: (text, record) => (
              <div onClick={()=>{openDrawer(text.id)}} size="middle">
                {record.completed == 1 ? <CheckCircleIcon style={{color:"green"}}></CheckCircleIcon> : <CheckCircleOutlinedIcon style={{color:"#D8D8D8"}}></CheckCircleOutlinedIcon>}
              </div>
            ),
        },
        {
          title: 'Name',
          key: 'name',
          render: (text, record) => (
            <div onClick={()=>{openDrawer(text.id)}} size="middle">
              {record.name}
            </div>
          ),
        },
        {
          title: 'Title',
          key: 'title',
          render: (text, record) => (
            <div onClick={()=>{openDrawer(text.id)}} size="middle">
              {record.title}
            </div>
          ),
        },
        {
          title: 'Created',
          key: 'date',
          render: (text, record) => (
            <div onClick={()=>{openDrawer(text.id)}} size="middle">
              {record.date}
            </div>
          ),
        },
        {
          title: 'Description',
          key: 'description',
          render: (text, record) => (
            <div onClick={()=>{openDrawer(text.id)}} size="middle">
              {record.description}
            </div>
          ),
        },
      ];

      const columnsResponsive = [
        {
            title: '',
            key: 'Completed',
            render: (text, record) => (
              <div onClick={()=>{openDrawer(text.id)}} size="middle">
                {record.completed == 1 ? <CheckCircleIcon style={{color:"green"}}></CheckCircleIcon> : <CheckCircleOutlinedIcon style={{color:"#D8D8D8"}}></CheckCircleOutlinedIcon>}
              </div>
            ),
        },
        {
          title: 'Title',
          key: 'title',
          render: (text, record) => (
            <div onClick={()=>{openDrawer(text.id)}} size="middle">
              {record.title}
            </div>
          ),
        },
        {
          title: 'Created',
          key: 'date',
          render: (text, record) => (
            <div onClick={()=>{openDrawer(text.id,text.name)}} size="middle">
              {record.date}
            </div>
          ),
        },
      ];

      const openDrawer = (id,name) =>{
        setDrawer(true)
        dispatch(obtenerTodoInfo(id))
      }

     const getAll = ()=>{

        if(count == 0){
            dispatch(obtenerTodoAction())
            
            setCount(1)
            
        }
        
      }

      const getSize=(width,height)=>{
          if(widthWindow != width){
            setWidthWindow(width)
          }
      }

    useEffect(() => {

        getAll()

    });

    const filtro = (date) => {
       
        dispatch(obtenerTodoFiltro(date))
        
    }

    const handleCancel = () => {
       
        setModal(false)

    }

    const handleOk = () => {
       
        if(title){
            dispatch(crearTodo(title,description))
            setError('none')
            setModal(false)
        }else{
            setError('')
        }
        
    }

    const handleOkEdit = () => {
        if(titleEdit){
            dispatch(editarTodo(idEdit,titleEdit,descriptionEdit,completedEdit,dateEdit))
            setErrorEdit('none')
            setModalEdit(false)
        }else{
            setError('')
        }
        
    }
    
    const completedEdition = (id,completed) =>{
        dispatch(editarCompletedTodo(id,completed))
    }

    const closeDrawer = () =>{
        setDrawer(false)
    }

    return (
        <div style={{display:"flex",alignContent:"center",width:"100%",height:"100vh",backgroundColor:"#EEEEEE",flexDirection:"column"}}>
            <div ref={ref}>
                {
                    getSize(width,height)
                }
            </div>
            <Modal title="New Task" visible={modal}  closable={false}
                footer={[
                    <div style={{width:"100%",height:35}}>
                        <div style={{position:"absolute",left:"5%"}}>
                            <button className="botonCancel" onClick={()=>handleCancel()}>
                            Cancel
                            </button>
                            <button key="submit" className="botonOK" onClick={()=>handleOk()}>
                            Save
                            </button>
                        </div>
                    </div>
                ]}>
                <div>
                    <label style={{color:"black",fontWeight:500}}>Title (Required)</label>
                    <input style={{marginTop:5}} onChange={(e)=>{setTitle(e.target.value)}} type="text" className="inputs" />
                    <label style={{color:"red",display:error}}>Required</label>
                </div>
                <div style={{marginTop:25}}>
                    <label style={{color:"black",fontWeight:500}}>Description</label>
                    <textarea rows="4" cols="50" style={{marginTop:5}} onChange={(e)=>{setDescription(e.target.value)}} type="text" className="inputs" />
                </div>

            </Modal>
            <Modal title="Edit Task" visible={modalEdit} closable={false}
                footer={[
                    <div style={{width:"100%",height:35}}>
                        <div style={{position:"absolute",left:"5%"}}>
                            <button className="botonCancel" onClick={()=>setModalEdit(false)}>
                            Cancel
                            </button>
                            <button key="submit" className="botonOK" onClick={()=>{handleOkEdit()}}>
                            Save
                            </button>
                        </div>
                    </div>
                ]}>

                <>
                    <div>
                        <label style={{color:"black",fontWeight:500}}>Title (Required)</label>
                        <input value={titleEdit} style={{marginTop:5}} onChange={(e)=>{setTitleEdit(e.target.value)}} type="text" className="inputs" />
                        <label style={{color:"red",display:errorEdit}}>Required</label>
                    </div>
                    <div style={{marginTop:25}}>
                        <label  style={{color:"black",fontWeight:500}}>Description</label>
                        <textarea value={descriptionEdit} rows="4" cols="50" style={{marginTop:5}} onChange={(e)=>{setDescriptionEdit(e.target.value)}} type="text" className="inputs" />
                    </div>
                </>

            </Modal>
            <Drawer
                title=""
                placement="right"
                closable={true}
                onClose={()=>closeDrawer()}
                visible={drawer}
                width={widthWindow < 500 ? 300 : 300}
            >
                <div style={{marginTop:"20%"}}>
                { 
                    unTodo.map(element => {
                       return( 
                            <>
                                <h1 style={{color:"black"}}>{element.title}</h1>
                                <Select defaultValue={element.completed} style={{ width: 200 }} onChange={(e)=>{completedEdition(element.id,e)}}>
                                    <Option value={0}>Status: Pending</Option>
                                    <Option value={1}>Status: Completed</Option>
                                </Select> 

                                <p style={{color:"black",fontWeight:700,fontSize:13,marginTop:20}}>Created <br></br> <span style={{color:"black",fontWeight:400,fontSize:13}}> {element.date} </span></p>
                                <p style={{color:"black",fontWeight:700,fontSize:13}}>Description <br></br>
                                <span style={{color:"black",fontWeight:400,fontSize:13}}>{element.description}</span></p>
                                {
                                    element.edit ? <p style={{color:"black",fontWeight:400,fontSize:13}}>Updated {element.edit}, <br></br> by {element.name} </p> : <p style={{color:"black",fontWeight:400,fontSize:13}}>By {element.name} </p>
                                }
                                <div style={{position:"absolute",bottom:"4%",left:"4%"}}>
                                    <div style={{display:"flex",flexDirection:"row"}}>
                                        <button className="botonDrawer" onClick={()=>{setModalEdit(true),setIdEdit(element.id),setTitleEdit(element.title),setDescriptionEdit(element.description),setCompletedEdit(element.completed),setDateEdit(element.date)}}>
                                            <EditOutlinedIcon className="iconosDrawer" style={{fontSize:15,marginRight:5}}></EditOutlinedIcon> Edit
                                        </button>
                                        <button className="botonDrawer" onClick={()=>{dispatch(borrarUnTodo(element.id),setDrawer(false))}}>
                                            <DeleteOutlineOutlinedIcon className="iconosDrawer" style={{fontSize:15,marginRight:5}}></DeleteOutlineOutlinedIcon> Delete
                                        </button>
                                    </div>
                                </div>
                            </>
                       )

                    })
                }
                </div>
            </Drawer>
            <div style={{padding:"2%"}}>
                <h1>My Tasks</h1>
                <Grid container>
                    <Grid xs={12}>
                        <div style={{textAlign:"center",color:"black",backgroundColor:"white",minHeight:"80vh"}}>
                            <div style={{display:"flex",flexDirection:"row",height:50}} className="borderColor">
                                <div style={{marginTop:10,marginLeft:"2%"}}>
                                    <p style={{color:"black",fontSize:16,fontWeight:700}}>Tasks</p>
                                </div>
                                <div style={{position:"absolute",right:"4%",marginTop:10, display:"flex",flexDirection:"row"}}>
                                    <DatePicker onChange={(date, dateString) => filtro(dateString)} style={{marginRight:10}} defaultValue={moment(new Date(), dateFormat)} format={dateFormat} />
                                    <div style={{backgroundColor:"gray",height:20,width:0.5,marginTop:5}} />
                                    <div onClick={()=>{setModal(true)}} className="buttons"><AddCircleOutlineIcon style={{fontSize:20,marginRight:5}} />Add Task</div>
                                </div>
                            </div>
                            <Table columns={widthWindow < 700?columnsResponsive : columns} dataSource={ todo} size="middle" pagination={false} style={{paddingLeft:"2%"}} />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Tables