import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-web';
import { db } from '../../firebase/config';
import Post from '../components/Post'

class Perfiles extends Component {
	constructor(props) {
		super(props);
		this.state = {
            user: {},
            posts: [],
            loading: true,
		};
	}
	
    componentDidMount() {
        console.log(this.props)
        db.collection('users')
            .where('email', '==',this.props.route.params.email)
            .onSnapshot((docs) => {
                let usersFromDb = {};
                docs.forEach((doc) => {
                    let user = doc.data();
                    console.log(user);
                    usersFromDb = {
                        id: doc.id,
                        data: user,
                    };
                });
                this.setState({ user: usersFromDb, loading: false });
            });

        db.collection('posts').where('owner', '==', this.props.route.params.email).onSnapshot(
            docs => {
                let postsFromDb = [];
                docs.forEach(oneDoc => {
                    let posteo = oneDoc.data();
                    postsFromDb.push({
                        id: oneDoc.id,
                        data: posteo
                    })
                    console.log(postsFromDb)
                })

                this.setState({
                    posts: postsFromDb,
                });
            }
        )
} 
        
render() {
    return (
        <>
            {this.state.loading ? <Text>Cargando</Text> :
                <View>
                    <Text>{this.state.user.data.username}</Text>
                    <Text>{this.state.user.data.email}</Text>
                    <Text>{this.state.user.data.bio}</Text>
                    <Text>{this.state.posts.length} posteo</Text>
                </View>}
            <FlatList
                data={this.state.posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Post 
                        id= {item.id}
                       description= {item.data.description}
                       owner= {item.data.owner}
                       url = {item.data.url}
                       likes= {item.data.likes}
                            {...this.props} >

                        </Post>
                    </View>
    )}
            />
        </>
    )
};

}
const styles = StyleSheet.create({
    
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
    flatList: {
        flex: 4,
        marginHorizontal: 20
    }
})

export default Perfiles;

    


