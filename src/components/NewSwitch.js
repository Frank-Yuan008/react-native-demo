import React, { Component } from 'react'
import { StyleSheet, Animated, TouchableOpacity } from 'react-native'

class NewSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleOn: false,
        }
        this.toggerPostion = new Animated.Value(1);
        this.scaleBg = new Animated.Value(1);
    }

    componentDidMount() {
        const { value } = this.props;
        if (value) {
            this.setState({ toggleOn: true })
            Animated.spring(this.toggerPostion, { toValue: 18, useNativeDriver: false }).start();
            Animated.timing(this.scaleBg, { toValue: 0, duration: 200, useNativeDriver: true, }).start();
        }
    }

    toggleSwitch = () => {
        const { onPress, useOnce, onValueChange } = this.props;
        if (this.state.toggleOn && useOnce === undefined) {
            this.setState({
                toggleOn: false,
            })
            Animated.spring(this.toggerPostion, { toValue: 1, useNativeDriver: false },).start();
            Animated.timing(this.scaleBg, { toValue: 1, duration: 200, useNativeDriver: true, }).start();
            onValueChange(false);
        } else {
            this.setState({
                toggleOn: true,
            })
            Animated.spring(this.toggerPostion, { toValue: 18, useNativeDriver: false },).start();
            Animated.timing(this.scaleBg, { toValue: 0.0, duration: 200, useNativeDriver: true, }).start();
            if (onPress) {
                setTimeout(() => { onPress() }, 400);
            }
            onValueChange(true);
        }
    }

    componentDidUpdate(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.toggleSwitch();
        }
    }

    render() {
        return (
            <TouchableOpacity style={[styles.container]} onPress={this.toggleSwitch} activeOpacity={1}>
                <Animated.View style={[styles.scaleBg, { transform: [{ scale: this.scaleBg }] }]}>
                </Animated.View>
                <Animated.View
                    style={[styles.toggleBtn, { left: this.toggerPostion }]}
                ></Animated.View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 20,
        width: 35,
        borderRadius: 10,
        backgroundColor: '#1E90FF',
        marginLeft: "auto"
    },
    scaleBg: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#E7E8EA',
    },
    toggleBtn: {
        height: 16,
        width: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        position: 'absolute',
        top: 1,
    }
});

export default NewSwitch