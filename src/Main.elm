import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


main =
  Browser.sandbox { init = init, update = update, view = view }


-- MODEL

type alias Model = Int

init : Model
init =
  0


-- UPDATE

type Msg = Increment | Decrement

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1      


-- VIEW

view : Model -> Html Msg
view model =
  div []
    [ div [ class "nes-container with-title is-centered"] 
        [ p [ class "title" ] [ text "Thing1"]
        , p [] 
          [ 
           button [ onClick Increment ] [ model |> String.fromInt |> text ]
          ]
        , button [ onClick Decrement ] [ text "<" ]
        ]
    ]