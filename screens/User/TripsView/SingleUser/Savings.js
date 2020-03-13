import React from 'react';
import {
    Text, 
    View, 
    StyleSheet
} from 'react-native'
import { Overlay } from 'react-native-elements';

<Overlay isVisible={this.state.isVisible}>
  <Text>Hello from Overlay!</Text>
</Overlay>;

{
  this.state.visible && (
    <Overlay isVisible>
      <Text>Hello from Overlay!</Text>
    </Overlay>
  );
}

<Overlay
  isVisible={this.state.isVisible}
  windowBackgroundColor="rgba(255, 255, 255, .5)"
  overlayBackgroundColor="red"
  width="auto"
  height="auto"
>
  <Text>Hello from Overlay!</Text>
</Overlay>;

<Overlay
  isVisible={this.state.isVisible}
  onBackdropPress={() => this.setState({ isVisible: false })}
>
  <Text>Hello from Overlay!</Text>
</Overlay>;



/////////////////////////////////////////////////////////////////


const Savings = props =>{
    
    const { navigation } = props

    
    return(
        <View style={styles.screen}>
            <View>
                <Text style={{color: 'black'}}>
                        SAVINGS HOMEPAGE
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
    }
    
})

export default Savings;