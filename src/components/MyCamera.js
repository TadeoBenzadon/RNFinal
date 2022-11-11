import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import {storage} from '../../firebase/config'
import {
    View,
    Text, 
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native'



export default class MyCamera extends Component {

    constructor(props){
        super(props)
        this.state = {
            permission: false,
            showCamera: true,
            uri: "",
        }
        this.metodosDeCamara = ''
    }

  
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then (()=> this.setState({
            permission: true,
        })
    )
        .catch( error => console.log(error))
    }

    tomarFoto(){
        console.log("Tomar Foto")
        this.metodosDeCamara.takePictureAsync()
            .then( photo => this.setState({
                uri: photo.uri,
                showCamera: false
            }))
            .catch (error => console.log(error))
    }

    guardarFoto(){
        console.log("Guardar Foto")
        fetch(this.state.uri)
        .then (res => res.blob())
            .then( image => {
                const ref = storage.ref(`photo/${Date.now()}.jpg`)
                ref.put(image)
                    .then(()=>{
                        ref.getDownloadURL()
                        .then((uri)=> {
                            this.props.onImageUpload(uri) // viene del componente padre
                        })
                    })
            })
            .catch(err => console.log(err))
    } 

    clearFoto(){
        console.log("Borrar Foto")
        this.setState({
            uri:'',
            showCamera: true
        })
    }


  render() {
    return (
         <View style={styles.container}>
            {
                this.state.permission ? 
                    this.state.showCamera ?
                        <View style={styles.cameraBody}>
                            <Camera 
                                style={styles.cameraBody}
                                type={Camera.Constants.Type.back}
                                ref= {(metodosDeCamara)=> this.metodosDeCamara = metodosDeCamara} 
                            />

                            <TouchableOpacity 
                                style={styles.buttonSave}
                                onPress = { ()=>this.tomarFoto()}
                            >
                                <Text >Tomar Foto</Text>
                            </TouchableOpacity>
                            
                        </View> :
                        

                        <View style={styles.cameraBody}>
                            {/* Vista previa de la imagen */}
                            <Image 
                                style={styles.preview}
                                source={{uri:this.state.uri}}
                                resizeMode='cover'
                            />
                            {/* Guardar fotor */}
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={()=>this.guardarFoto()}
                            >
                                <Text>Guardar Foto</Text>
                            </TouchableOpacity>
                            {/* Rechazar foto* */}
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={()=>this.clearFoto()}
                            >
                                <Text>Eliminar</Text>
                            </TouchableOpacity>
                        </View> : 
                        <Text>No Hay permisos para la camara</Text>
            }
        </View> 
    )
  }
}

const styles = StyleSheet.create({
    cameraBody: {
        height: '80%',
        width:'80%',
        alignItems:"center",
        marginTop: 10,
        display:"flex",
        justifyContent:"center",
    },
    container:{
        backgroundColor: '#cabfa5',
        flex:4,
        flexDirection: 'column',
        borderWidth:1,
        borderRadius:5,
        paddingVertical:16,
        paddingHorizontal:10,
        alignItems:"center",
        height: "100%",
        marginTop: 10,
        display:"flex",
        justifyContent:"center",
    },
    button:{
        borderRadius: 10,
         padding:2,
         borderWidth: 1,
         borderColor: '#62504c',
         backgroundColor: '#62504c',
         width:200,
         height: 40,
         display:"flex",
         justifyContent:"center",
         alignItems:"center",
    },
    preview:{
        height: '80%',
        width:'80%',
        alignItems:"center",
        marginTop: 10,
        display:"flex",
        justifyContent:"center",
    },
    buttonSave:{
        borderRadius: 10,
         padding:2,
         borderWidth: 1,
         borderColor: '#62504c',
         backgroundColor: '#62504c',
         width:200,
         height: 50,
         display:"flex",
         justifyContent:"center",
         alignItems:"center",
    },
}) 
