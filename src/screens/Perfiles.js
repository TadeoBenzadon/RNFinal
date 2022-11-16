import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-web';
import { db , auth} from '../../firebase/config';
import Post from '../components/Post'

class Perfiles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posteos: [], 
		};
	}
	
	 componentDidMount() {

        db.collection('posts').doc(this.props.route.params.email).onSnapshot(doc => {
            let posteosFromDb= [];
            let posts = doc.data();
            posteosFromDb.push ({ id: doc.id, data: posts })
            console.log(posteosFromDb);
            this.setState({
                posteos: posteosFromDb
            })
        }

	)} 

        
	render() {
		return (
			<>
				<Text style= {styles.titulo} > Posteos </Text>
                 <FlatList 
					data={this.state.posteos}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style= {styles.container}> 
                         <Text style= {styles.text}> {item.data} </Text>
						</View>
					)}
				/>
       
            </>
		);
	}

}
const styles = StyleSheet.create({
    titulo:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize:50,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom:20,
        color: "black",
    },
    titulo2:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize:20,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom:20,
        color: "black",
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
         height: 50,
         display:"flex",
         justifyContent:"center",
         alignItems:"center",
   }, campo: {
    borderRadius: 10,
    width:200,
    height: 50,
    paddingLeft: 10,
    borderColor: '#62504c',
    borderWidth: 1,
    marginBottom:8,
    borderRadius: 10,
  },
    text:{
        textAlign: 'center',
        fontWeight: 50,
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 10,
   }
})

export default Perfiles;

    


