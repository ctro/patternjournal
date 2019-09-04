import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


main =
  Browser.document 
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }


-- MODEL

type alias Model = 
  { count : Int
  }

init : () -> (Model, Cmd Msg)
init flags =
  ( Model 0
  , Cmd.none 
  )


-- UPDATE

type Msg = Increment | Decrement

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Increment ->
      ( { model | count = model.count + 1 }
      , Cmd.none
      )

    Decrement ->
      ( { model | count = model.count - 1 }
      , Cmd.none
      )


-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


-- VIEW

view : Model -> Browser.Document Msg
view model =
  { title = "PJ Title Control!"
  , body = 
    [
    div []
      [ div [ class "nes-container with-title is-centered"] 
          [ p [ class "title" ] [ text "Thing1"]
          , p [] 
            [ 
            button [ onClick Increment ] [ model.count |> String.fromInt |> text ]
            ]
          , button [ onClick Decrement ] [ text "<" ]
          ]
      ]
    ]
  } 