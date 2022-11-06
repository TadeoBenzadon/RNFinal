import React, { Component } from 'react';
import {View, Text, FlatList, StyleSheet } from 'react-native';
import {db} from '../../firebase/config'; 


class Home extends Component{
    constructor(props) {
		super(props);
		this.state = {
			posts:[]
        }
    }
    
    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts
                })
            }
        )
        
    }

    render(){
        // console.log(this.state);
        return(
                <View>
                    <Text>Posteos</Text>
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem = { ({item}) => <Post dataPost={item} 
                        {...this.props} />}
                    />
                    
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

export default Home;