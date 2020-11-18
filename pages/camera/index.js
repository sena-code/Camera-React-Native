import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Button, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';

const Cameras = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camera = useRef(null);
  const [captured, setCaptured] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

 

  
 
    
   const takePicuture = async () => {
   
        if(camera){
           const data = await camera.current.takePictureAsync();
            setCaptured(data.uri);
            setOpen(true);
            console.log(data);
        
        }
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera ref={camera} style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        
        </View>
        <View
        
            


        >
<Button title="Take" onPress={() => takePicuture()}/>
        </View>
      </Camera>
      {captured && 
         <Modal 
         animationType="slide"
         transparent={false}
         visible={open}
         >
             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20}}> 
                <TouchableOpacity style={{margin: 10}} onPress={() => setCaptured(false)}>
                <Text>Fechar</Text>
                </TouchableOpacity>
                <Image style={{width: '100%', height: 300, borderRadius: 20}} source={{uri : captured}}/>
             </View>
         </Modal> }
    </View>
  );
}
export default Cameras;
