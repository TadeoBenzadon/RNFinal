import React, { Component } from 'react';
import {View, FlatList, StyleSheet, Image } from 'react-native';
import {db} from '../../firebase/config' 


class HomeMenu extends Component{
    constructor (){
        super ()
        this.state = {
            posteos: [],
            loading: true,
        }
    }
    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs =>{
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                this.setState({
                    posteos: posts,
                    loading: false
                })
                })
            }
        )

}
render() {
    return (
        <View style= {styles.container}>
            {
                this.state.loading ?
                <Loader/> :
                <View style= {styles.container}>
                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={(item)=> item.id.toString()}
                        renderItem={({item}) => <Post info={item} navigation={this.props.navigation}/>}
                    
                    />
                </View>
            }

        </View>
    )
  }
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth:1,
        borderRadius:5,
        backgroundColor:'black',
        paddingVertical:16,
        paddingHorizontal:8,
    }
})

export default HomeMenu;