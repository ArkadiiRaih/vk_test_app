import React, { useState, useEffect } from "react";
import connect from "@vkontakte/vk-connect";
import View from "@vkontakte/vkui/dist/components/View/View";
import "@vkontakte/vkui/dist/vkui.css";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import PanelSpinner from "@vkontakte/vkui/dist/components/PanelSpinner/PanelSpinner";

const App = () => {
  const [fetchedUser, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const user = await connect.sendPromise("VKWebAppGetUserInfo");
      setUser(user);
      setLoading(false);
    }
    fetchData();
  }, []);

  const share = () => {
    connect.sendPromise("VKWebAppShowWallPostBox", {
      message: "https://www.vk.com/app7257506"
    });
  };

  return (
    <View>
      <Panel centered={true}>
        <PanelHeader>Test App</PanelHeader>
        {loading ? (
          <PanelSpinner size="large" />
        ) : (
          <Div>
            <img src={fetchedUser.photo_200} alt="user avatar"></img>
            <h1>{`${fetchedUser.first_name} ${fetchedUser.last_name}`}</h1>
            <Button align="center" size="xl" onClick={share}>
              Share App
            </Button>
          </Div>
        )}
      </Panel>
    </View>
  );
};

export default App;
