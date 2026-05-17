from django.urls import path
from .views import (
    SignUpView, SignInView, RestaurantListCreateView, RestaurantDetailView,
    MenuItemsByRestaurantView, MenuItemListCreateView, MenuItemDetailView, OrderCreateView
)

urlpatterns = [
    path('auth/signup/', SignUpView.as_view(), name='signup'),
    path('auth/signin/', SignInView.as_view(), name='signin'),
    path('restaurants/', RestaurantListCreateView.as_view(), name='restaurants'),
    path('restaurants/<int:pk>/', RestaurantDetailView.as_view(), name='restaurant-detail'),
    path('menu/<int:restaurantId>/', MenuItemsByRestaurantView.as_view(), name='menu-by-restaurant'),
    path('menu/', MenuItemListCreateView.as_view(), name='menu-list-create'),
    path('menu/<int:pk>/', MenuItemDetailView.as_view(), name='menu-detail'),
    path('orders/', OrderCreateView.as_view(), name='orders'),
]
