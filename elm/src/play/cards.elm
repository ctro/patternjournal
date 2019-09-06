-- Press a button to draw a random card.
--
-- Dependencies:
--   elm install elm/random
--

import Browser
import Html exposing (..)
import Html.Attributes exposing (style)
import Html.Events exposing (..)
import Task
import Process
import Random



-- MAIN


main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }



-- MODEL


type alias Model =
  { card : Card
  , sleeping : Bool
  }


init : () -> (Model, Cmd Msg)
init _ =
  ( Model Three False
  , Cmd.none
  )


type Card
  = Ace
  | Two
  | Three
  | Four
  | Five
  | Six
  | Seven
  | Eight
  | Nine
  | Ten
  | Jack
  | Queen
  | King



-- UPDATE


type Msg
  = Draw
  | Slept
  | NewCard Card


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Draw ->
      ( { model | sleeping = True }
      , Cmd.batch [Task.attempt (always Slept) (Process.sleep 1000.0), Random.generate NewCard cardGenerator]
      )
    Slept ->
      ( { model | sleeping = False }
      , Cmd.none
      )
    NewCard newCard ->
      ( { model | card = newCard }
      , Cmd.none
      )


cardGenerator : Random.Generator Card
cardGenerator =
  Random.uniform Ace
    [ Two
    , Three
    , Four
    , Five
    , Six
    , Seven
    , Eight
    , Nine
    , Ten
    , Jack
    , Queen
    , King
    ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ button [ onClick Draw ] [ text "Draw" ]
    , div [ style "font-size" "12em" ] [ text (viewCard model.card) ]
    , div [] [ text (if model.sleeping then "Sleeping" else "Not sleeping") ]
    ]


viewCard : Card -> String
viewCard card =
  case card of
    Ace -> "🂡"
    Two -> "🂢"
    Three -> "🂣"
    Four -> "🂤"
    Five -> "🂥"
    Six -> "🂦"
    Seven -> "🂧"
    Eight -> "🂨"
    Nine -> "🂩"
    Ten -> "🂪"
    Jack -> "🂫"
    Queen -> "🂭"
    King -> "🂮"