-- The url to this page should be /yyyy/mm/dd
import Browser
import Html exposing (..)
import Html.Attributes exposing(..)

import Date
import Time exposing (Month(..))

main =
  Browser.sandbox { init = init, update = update, view = view }


-- MODEL

type alias Model = { 
  date : String
  }

init : Model
init = {
  date = "2019-01-02"
  }


-- UPDATE

type Msg = Increment | Reset

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
     { date = "2019-01-03" }

    Reset ->
     { date = "2019-01-01" }


-- VIEW

view : Model -> Html Msg
view model =
  div [] 
    [ p [] [ text model.date ] ]