cmake_minimum_required(VERSION 3.9.0)

add_library(cpp
            SHARED
            ../cpp/example.cpp
            ./cpp-adapter.cpp
            ../../react-native/ReactCommon/jsi/jsi/jsi.cpp
)

include_directories(
            ../../react-native/React
            ../../react-native/React/Base
            ../../react-native/ReactCommon/jsi
            ../cpp
)

set_target_properties(
        cpp PROPERTIES
        CXX_STANDARD 17
        CXX_EXTENSIONS OFF
        POSITION_INDEPENDENT_CODE ON
)

target_link_libraries(
        cpp
        android
)
