import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { auth, db } from '../../firebase/config'
import Post from '../components/Post'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            posts: [],
            loading: true,
        };
    }

    componentDidMount(email) {
        db.collection('users')
            .where('email', '==', auth.currentUser.email)
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

        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
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
    };



    logOut() {
        auth.signOut();
        this.props.navigation.navigate('Register');
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
                        <TouchableOpacity onPress={() => this.logOut()}>
                            <Text style={styles.button}>Cerrar Sesion</Text>
                        </TouchableOpacity>
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
    }
}

const styles = StyleSheet.create({


    button: {
        borderRadius: 10,
        padding: 2,
        borderWidth: 1,
        borderColor: '#62504c',
        backgroundColor: '#62504c',
        width: 200,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        backgroundColor: '#cabfa5',
        flex: 4,
        flexDirection: 'column',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 16,
        paddingHorizontal: 10,
        alignItems: "center",
        height: "100%",
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
    },
    text: {
        textAlign: 'center',
        fontWeight: 50,
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    titulo2: {
        textAlign: 'center',
        fontWeight: 50,
        fontSize: 50,
        paddingTop: 10,
        paddingBottom: 10,
    },
    flatList: {
        flex: 4,
        marginHorizontal: 20
    }
})
