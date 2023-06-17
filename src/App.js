import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Form, FormGroup, Navbar, Row, Table } from 'react-bootstrap';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import { toast, ToastContainer } from 'react-toastify';
import './App.css';

function App () {
  const api = 'https://data-customer.onrender.com/users';
  const [ user, setUser ] = useState( [] );
  useEffect( () => {
    loadUsers();
  }, [] );
  const loadUsers = async () => {
    const response = await axios.get( api );
    setUser( response.data );
  }
  const [ formData, setFormData ] = useState( {
    name: '',
    address: '',
    state: '',
    district: '',
    date: '',
    operation: '',
    sector: '',
  } );
  const [ userId, setUserId ] = useState( null );
  const [ editMode, setEditMode ] = useState( false );

  // console.log(user);
  const handleDelete = ( id ) => {
    if ( window.confirm( 'Are you sure to delete?' ) ) {
      axios.delete( `${ api }/${ id }` );
      toast.error( 'Deleted Successfully' );
      setTimeout( () => {
        loadUsers();
      }, 4500 )
    }
  }

  const handleUpdate = ( id ) => {
    const singleUser = user.find( item => item.id === id );
    setFormData( singleUser );
    setUserId( id );
    setEditMode( true );
  }
  const handleChange = ( e ) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData( { ...formData, [ name ]: value } );
  }
  console.log( formData );
  const handleSubmit = ( e ) => {
    e.preventDefault();
    if ( !formData.name || !formData.address || !formData.district || !formData.state || !formData.date || !formData.operation || !formData.sector ) {
      toast.error( 'Please enter all fields' );
    } else {
      if ( !editMode ) {
        axios.post( api, formData );
        toast.success( 'Added Successfully' );
        // loadUsers();

        setTimeout( () => {
          loadUsers();
        }, 1000 );
        formData.name = '';
        formData.address = '';
        formData.district = '';
        formData.state = '';
        formData.operation = '';
        formData.sector = '';
        formData.date = '';
      } else {
        axios.put( `${ api }/${ userId }`, formData );
        toast.success( 'Updated Successfully' );
        setTimeout( () => {
          loadUsers();
        }, 500 );
        formData.name = '';
        formData.address = '';
        formData.district = '';
        formData.state = '';
        formData.sector = '';
        formData.operation = '';
        formData.date = '';
        setEditMode( false );
      }

    }
  }
  return ( <
        div className="App" >
    <
        Navbar bg='primary'
      variant='dark'
      className='justify-content-center'
      style={
        { marginBottom: '35px' } } >
      <
        Navbar.Brand >
        Ministry of Cooperative Societies(CRCS) - DashBoard <
        /Navbar.Brand> <
        /Navbar>

        <
        Row >
          <
        Col id="imp"
            md={ 3 } >
            <
        Form onSubmit={ handleSubmit } >
              <
        FormGroup >
                <
        Form.Label > Name < /Form.Label> <
                    Form.Control type="text"
                    name="name"
                    value={ formData.name }
                    onChange={ handleChange }
                    placeholder="Enter Name" />
                  <
        /FormGroup> <
        FormGroup >
                    <
        Form.Label > Address < /Form.Label> <
                        Form.Control type="text"
                        name="address"
                        value={ formData.address }
                        onChange={ handleChange }
                        placeholder="Enter Address" />
                      <
        /FormGroup> <
        FormGroup >
                        <
        Form.Label > State < /Form.Label> <
                            Form.Control type="text"
                            name="state"
                            value={ formData.state }
                            onChange={ handleChange }
                            placeholder="Enter State" />
                          <
        /FormGroup> <
        FormGroup >
                            <
        Form.Label > District < /Form.Label> <
                                Form.Control type="text"
                                name="district"
                                value={ formData.district }
                                onChange={ handleChange }
                                placeholder="Enter District" />
                              <
        /FormGroup> <
        FormGroup >
                                <
        Form.Label > Date of Registration < /Form.Label> <
                                    Form.Control type="date"
                                    name="date"
                                    value={ formData.date }
                                    onChange={ handleChange }
                                    placeholder="Enter Date" />
                                  <
        /FormGroup> <
        FormGroup >
                                    <
        Form.Label > Area of Operation < /Form.Label> <
                                        Form.Control type="text"
                                        name="operation"
                                        value={ formData.operation }
                                        onChange={ handleChange }
                                        placeholder="Enter Operation" />
                                      <
        /FormGroup> <
        FormGroup >
                                        <
        Form.Label > Sector Type < /Form.Label> <
                                            Form.Control type="text"
                                            name="sector"
                                            value={ formData.sector }
                                            onChange={ handleChange }
                                            placeholder="Enter Sector" />
                                          <
        /FormGroup> <
        div className='d-grid gap-2 mt-2' >
                                            <
        Button type='submit'
                                              variant='primary'
                                              size='lg' > { editMode ? 'Update' : 'Submit' } < /Button> <
        /div> <
        /Form> <
        /Col> <
        Col md={ 9 } >
                                                <
        Table bordered hover >
                                                  <
        thead >
                                                    <
        tr >
                                                      <
        th > S.no < /th> <
        th > Name of Society < /th> <
        th > Address < /th> <
        th > State < /th> <
        th > District < /th> <
        th > Date < /th> <
        th > Operation < /th> <
        th > Sector type < /th> <
        th > Action < /th> <
        /tr> <
        /thead> {
                                                                          user.map( ( element, index ) => {
                                                                            return ( < tbody key={ index } >
                                                                              <
                        tr >
                                                                                <
                        td > { index + 1 } < /td> <
                        td > { element.name } < /td> <
                        td > { element.address } < /td> <
                        td > { element.state } < /td> <
                        td > { element.district } < /td> <
                        td > { element.date } < /td> <
                        td > { element.operation } < /td> <
                        td > { element.sector } < /td> <
                        td >
                                                                                                  <
                        ButtonGroup >
                                                                                                    <
                        Button style={
                                                                                                        { marginRight: '5px' } }
                                                                                                      variant="success"
                                                                                                      onClick={
                                                                                                        () => handleUpdate( element.id ) } > Update < /Button> <
                        Button style={
                                                                                                            { marginLeft: '5px' } }
                                                                                                          variant="danger"
                                                                                                          onClick={
                                                                                                            () => handleDelete( element.id ) } > Delete < /Button> <
                        /ButtonGroup> <
                        /td> <
                        /tr> <
                        /tbody> );


                    })
            }

                                                                                                        <
            /Table> <
            /Col> <
            /Row>

                                                                                                        <
                                                                                                          ToastContainer />

                                                                                                        <
                /div>
                                                                                                        );
    }

                                                                                                        export default App;